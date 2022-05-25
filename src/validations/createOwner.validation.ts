import * as yup from "yup";

const createOwnerSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required("name is required"),
        lastName: yup.string().required("lastName is required"),
        email: yup.string().required("email is required"),
        password: yup.string().required("password is required"),
        cpf: yup.number().required("cpf is required"),
        cellphone: yup.number().required("cellphone is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default createOwnerSchema;
