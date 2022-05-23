import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";

describe("client - API ROUTE", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  const clientData = {
    name: "Yorran",
    lastName: "Rodrigues",
    email: "yorran@email.com",
    password: "senhaForte",
    cellphone: 999999999,
  };

  it("should be able to create a new user in the API", async () => {
    const response = await request(app).post("/clients").send(clientData);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("lastName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("cellphone");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
  });

  it("should return a bad request message", async () => {
    const response = await request(app).post("/clients").send(clientData);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("message");
  });

  it("should be able to return the clients list", async () => {
      const response = await request(app).get("/clients");

      expect(response.status).toBe(200);
      
      expect(response.body).toEqual({})
  });
});
