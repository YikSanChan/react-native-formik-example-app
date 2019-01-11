import React from "react";
import {
  DatePickerIOS,
  Picker,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
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

const DatePickerInputField = ({ label, value, error, handleChange }) => (
  <View>
    <FormLabel>{label}</FormLabel>
    <DatePickerIOS date={value} onDateChange={handleChange} />
    <FormValidationMessage>{error}</FormValidationMessage>
  </View>
);

export default class App extends React.Component {
  handleSubmit = values => {
    alert(JSON.stringify(values, null, 2));
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Formik
          initialValues={{
            name: "iPhone X",
            price: "1000",
            owner: "jackdorsey@twitter.com",
            status: "0",
            purchasedAt: new Date()
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
          {({ setFieldValue, handleSubmit, values, errors, isValid }) => (
            <View>
              <TextInputField
                label="name"
                value={values.name}
                error={errors.name}
                handleChange={value => setFieldValue("name", value)}
              />
              <TextInputField
                label="price"
                value={values.price}
                error={errors.price}
                handleChange={value => setFieldValue("price", value)}
              />
              <TextInputField
                label="owner"
                value={values.owner}
                error={errors.owner}
                handleChange={value => setFieldValue("owner", value)}
              />
              <PickerInputField
                label="status"
                value={values.status}
                error={errors.status}
                handleChange={value => setFieldValue("status", value)}
                options={[
                  { label: "New", value: "0" },
                  { label: "Donated", value: "1" },
                  { label: "Ebay", value: "2" }
                ]}
              />
              <DatePickerInputField
                label="purchasedAt"
                value={values.purchasedAt}
                error={errors.purchasedAt}
                handleChange={value => setFieldValue("purchasedAt", value)}
              />
              <Button
                title="Submit"
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
