import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./location.css";
import GeoAPI from "../components/GeoAPI";

const LocationForm = ({ setPage, setWeatherData }) => {
  const initialValues = {
    latitude: "",
    longitude: "",
  };

  const validationSchema = Yup.object({
    latitude: Yup.number().min(-90).max(90).required("Latitude is required"),
    longitude: Yup.number()
      .min(-180)
      .max(180)
      .required("Longitude is required"),
  });

  useEffect(() => {
    var location = JSON.parse(localStorage.getItem("location"));
    if (location) {
      formik.setValues({
        ...formik.values,
        latitude: location?.latitude,
        longitude: location?.longitude,
      });
    }
  }, []);
  const onSubmit = async (values, { setSubmitting }) => {
    if (!values.latitude || !values.longitude) {
      formik.setErrors({
        latitude: "Latitude is required",
        longitude: "Longitude is required",
      });
      setSubmitting(false);
      return;
    } else {
      var response = await GeoAPI(values);
      if (response.status >= 200 && response.status < 400) {
        localStorage.setItem(
          "location",
          JSON.stringify({
            latitude: values.latitude,
            longitude: values.longitude,
          })
        );
        setWeatherData(response.data);
        setPage("weatherPage");
      }
    }
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          formik.setValues({
            ...formik.values,
            latitude: latitude,
            longitude: longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="inputDiv">
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="text"
          id="latitude"
          name="latitude"
          className="inputTag"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.latitude}
        />
        {formik.touched.latitude && formik.errors.latitude ? (
          <div className="errorMessage">{formik.errors.latitude}</div>
        ) : null}
      </div>

      <div className="inputDiv">
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="text"
          id="longitude"
          name="longitude"
          className="inputTag"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.longitude}
        />
        {formik.touched.longitude && formik.errors.longitude ? (
          <div className="errorMessage">{formik.errors.longitude}</div>
        ) : null}
      </div>
      <button
        type="button"
        className="locationButton"
        onClick={getCurrentLocation}
      >
        Get Current Location
      </button>
      <button className="submitButton" type="submit">
        Submit
      </button>
    </form>
  );
};

export default LocationForm;
