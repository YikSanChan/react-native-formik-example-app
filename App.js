import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "react-native-elements";
import {
  DatePickerInputField,
  ImageInputField,
  PickerInputField,
  TextInputField
} from "./components/Fields";

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
            purchasedAt: new Date(),
            photo: null
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
              <ImageInputField
                label="Photo"
                value={values.photo}
                handleChange={value => setFieldValue("photo", value)}
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
