import * as yup from "yup";

const createCompanySchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        status: yup.string().required("status is required"),
        isBudget: yup.boolean().required("isBudget is required"),
        delivery_date: yup.string().required("delivery_date is required"),
        cart_id: yup.string().required("cart_id is required"),
        client_id: yup.string().required("client_id is required"),
        employee_id: yup.string().required("employee_id is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default createCompanySchema;
