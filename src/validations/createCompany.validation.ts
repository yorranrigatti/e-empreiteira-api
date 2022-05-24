import * as yup from "yup";

const createCompanySchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required("name is required"),
        cnpj: yup.string().required("cnpj is required"),
        type: yup.string().required("type is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default createCompanySchema;
