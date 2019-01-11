import React from "react";
import { Picker, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormInput,
  FormLabel,
  FormValidationMessage
} from "react-native-elements";

const TextInputField = ({ label, value, error, handleChange }) => (
  <View>
    <FormLabel>{label}</FormLabel>
    <FormInput value={value} onChangeText={handleChange} />
    <FormValidationMessage>{error}</FormValidationMessage>
  </View>
);

const PickerInputField = ({ label, value, error, handleChange, options }) => (
  <View>
    <FormLabel>{label}</FormLabel>
    <Picker selectedValue={value} onValueChange={handleChange}>
      {options.map((option, i) => (
        <Picker.Item key={i} label={option.label} value={option.value} />
      ))}
    </Picker>
    <FormValidationMessage>{error}</FormValidationMessage>
  </View>
);

export default class App extends React.Component {
  handleSubmit = values => {
    alert(JSON.stringify(values, null, 2));
  };

  render() {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            name: "iPhone X",
            price: "1000",
            owner: "jackdorsey@twitter.com",
            status: "0"
          }}
          isInitialValid={true}
          onSubmit={this.handleSubmit}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.string()
              .matches(/^[0-9]*$/)
              .required(),
            owner: Yup.string()
              .email()
              .required()
          })}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
            <View>
              <TextInputField
                label="name"
                value={values.name}
                error={errors.name}
                handleChange={handleChange("name")}
              />
              <TextInputField
                label="price"
                value={values.price}
                error={errors.price}
                handleChange={handleChange("price")}
              />
              <TextInputField
                label="owner"
                value={values.owner}
                error={errors.owner}
                handleChange={handleChange("owner")}
              />
              <PickerInputField
                label="status"
                value={values.status}
                error={errors.status}
                handleChange={handleChange("status")}
                options={[
                  { label: "New", value: "0" },
                  { label: "Donated", value: "1" },
                  { label: "Ebay", value: "2" }
                ]}
              />
              <Button
                title="Submit"
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
