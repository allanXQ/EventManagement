import { Form, Formik, useFormikContext } from "formik";

import MUITextField from "../inputs/textField";
import { Box, Input } from "@mui/material";
import getValidationSchema from "../utils/getValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { apiCall } from "../../../redux/async/asyncThunk";
import { MuiButton } from "../../common/Button";
import { selectUser } from "../../../redux/features/user/userSlice";
import MUISelectField from "../inputs/select";

const FileUpload = ({ name, ...otherProps }) => {
    const { setFieldValue } = useFormikContext();
    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        setFieldValue(name, file); // Update Formik's state
    };

    return (
        <label htmlFor={name}>
            <MUITextField
                id={name}
                name={name}
                type="file"
                onChange={handleFileChange}
                // style={{ display: "none" }}
                {...otherProps}
            />
            {/* <MuiButton variant="contained" component="span">
        Upload
      </MuiButton> */}
        </label>
    );
};

const CenteredBox = (props) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            ...props.sx,
        }}
        {...props}
    />
);

const FIELD_COMPONENTS = {
    email: MUITextField,
    password: MUITextField,
    text: MUITextField,
    number: MUITextField,
    select: MUISelectField,
    file: FileUpload,
    date: MUITextField,
    time: MUITextField,
};

const getInitialValues = (fields, initialFormValues = {}) => {
    return fields.reduce((values, field) => {
        values[field.name] =
            initialFormValues[field.name] || field.defaultValue || "";
        return values;
    }, {});
};
const CreateForm = (model, children, initialFormValues) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const initialValues = getInitialValues(model.fields, initialFormValues);

    const fields = model.fields;
    return (
        <CenteredBox>
            <Formik
                initialValues={initialValues}
                validationSchema={getValidationSchema(fields)}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = new FormData();
                    values = { ...values, userId: user.userId };
                    Object.keys(values).forEach((key) => {
                        if (key === "image" && values[key]) {
                            // Append file if it exists
                            formData.append(key, values[key]);
                        } else if (
                            typeof values[key] === "object" &&
                            values[key] !== null
                        ) {
                            // For objects (excluding null), stringify them
                            formData.append(key, JSON.stringify(values[key]));
                        } else {
                            // For all other values, append directly
                            formData.append(key, values[key]);
                        }
                    });
                    // formData.append("userId", user.userId);
                    dispatch(
                        apiCall({
                            endpoint: model.endpoint,
                            method: model.method,
                            data: values.image ? formData : values,
                            slice: "userData",
                        })
                    );
                    setSubmitting(false);
                }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <>
                            <CenteredBox
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 2,
                                }}
                            >
                                <CenteredBox
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 3,
                                    }}
                                >
                                    {fields.map((field, index) => {
                                        if (field.header)
                                            return <Box>{field.header}</Box>;
                                        const InputComponent =
                                            FIELD_COMPONENTS[field.type];
                                        if (InputComponent) {
                                            return (
                                                <InputComponent
                                                    key={field.name}
                                                    type={field.type}
                                                    required={field.required}
                                                    label={field.label}
                                                    name={field.name}
                                                    value={field.value}
                                                    defaultValue={
                                                        field.defaultValue ||
                                                        initialValues[
                                                            field.name
                                                        ]
                                                    }
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                    variant={field.variant}
                                                    disabled={field.disabled}
                                                    options={field.options}
                                                    sx={field.sx}
                                                />
                                            );
                                        }
                                        return null;
                                    })}
                                </CenteredBox>
                                {children}
                            </CenteredBox>
                            <MuiButton
                                variant="contained"
                                type="submit"
                                disabled={isSubmitting}
                                sx={{
                                    width: "20rem",
                                    py: 1,
                                    mt: 2,
                                    borderRadius: "2rem",
                                    textTransform: "none",
                                    color: "white.main",
                                    ...model.buttonSx,
                                }}
                                content={model.button || model.name}
                            />
                        </>
                    </Form>
                )}
            </Formik>
        </CenteredBox>
    );
};

export default CreateForm;
