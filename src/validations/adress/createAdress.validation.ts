import * as yup from "yup";

const createAdressSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        country: yup.string().required("country is required"),
        state: yup.string().required("state is required"),
        city: yup.string().required("city is required"),
        street: yup.string().required("street is required"),
        number: yup.number().required("number is required"),
        complement: yup.string(),
        postalcode: yup.number().required("postalcode is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default createAdressSchema;
