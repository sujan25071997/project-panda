import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./core-components/InputField";
import Button from "./core-components/Button";
import { updateProfile } from "@/store/actions/profileActions";
import { useFormik } from "formik";
import * as Yup from "yup";
import RadioButtonGroup from "./core-components/RadioButtonGroup";
import Image from "next/image";

// Validation schema using Yup
const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  gender: Yup.string().required("Gender is required"),
  address_line1: Yup.string(),
  address_line2: Yup.string(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  pincode: Yup.string().required("Pincode is required"),
});

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.userProfile);

  const [initialProfile, setInitialProfile] = useState(
    userProfile?.profile || {}
  );

  // Initialize formik with initial values and validation schema
  const formik = useFormik({
    enableReinitialize: true, // <-- this is the fix
    initialValues: {
      first_name: initialProfile.first_name || "",
      last_name: initialProfile.last_name || "",
      phone: initialProfile.phone || "",
      gender: initialProfile.gender || "",
      address_line1: initialProfile.address_line1 || "",
      address_line2: initialProfile.address_line2 || "",
      city: initialProfile.city || "",
      state: initialProfile.state || "",
      country: initialProfile.country || "",
      pincode: initialProfile.pincode || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (initialProfile.id) {
        dispatch(updateProfile(initialProfile.id, values));
      }
    },
  });

  useEffect(() => {
    if (userProfile?.profile) {
      setInitialProfile(userProfile.profile);
    }
  }, [userProfile?.profile]);

  const hasChanges =
    JSON.stringify(formik.values) !== JSON.stringify(initialProfile);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative bottom-14 z-10 flex items-center justify-center h-screen text-emerald-700">
        <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 w-full max-w-[100vh] shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Update Profile 🐼
          </h2>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.first_name && formik.errors.first_name}
              />
              <InputField
                label="Last Name"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.last_name && formik.errors.last_name}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && formik.errors.phone}
              />
              <RadioButtonGroup
                label="Gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
                error={formik.touched.gender && formik.errors.gender}
              />
            </div>
            <InputField
              label="Address Line 1"
              name="address_line1"
              value={formik.values.address_line1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.address_line1 && formik.errors.address_line1
              }
            />
            <InputField
              label="Address Line 2"
              name="address_line2"
              value={formik.values.address_line2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.address_line2 && formik.errors.address_line2
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && formik.errors.city}
              />
              <InputField
                label="State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && formik.errors.state}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && formik.errors.country}
              />
              <InputField
                label="Pincode"
                name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pincode && formik.errors.pincode}
              />
            </div>
            <Button type="submit" disabled={!hasChanges || !formik.isValid}>
              Update
            </Button>
          </form>
          <Image
            src="/hey-panda.gif"
            alt="Animated Panda"
            width={100}
            height={100}
            className="absolute left-20 bottom-0 drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};
