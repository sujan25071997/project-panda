import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./core-components/InputField";
import Button from "./core-components/Button";
import { updateProfile } from "@/store/actions/profileActions"; // import your updateProfile action

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const [profile, setProfile] = useState(userProfile?.profile || {});

  useEffect(() => {
    if (userProfile?.profile) {
      setProfile(userProfile?.profile);
    }
  }, [userProfile?.profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form default submission behavior
    if (profile?.id) {
      dispatch(updateProfile(profile?.id, profile));
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Profile card */}
      <div className="relative z-10 flex items-center justify-center h-screen text-emerald-700">
        <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 w-full max-w-[100vh] shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-6 ">
            Update Profile 🐼
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="first_name"
                value={profile?.first_name}
                onChange={handleChange}
              />
              <InputField
                label="Last Name"
                name="last_name"
                value={profile?.last_name}
                onChange={handleChange}
              />
            </div>
            <InputField
              label="Email"
              name="email"
              value={profile?.email}
              onChange={handleChange} // Added onChange here to enable email editing
            />
            <InputField
              label="Pincode"
              name="pincode"
              value={profile?.pincode}
              onChange={handleChange}
            />
            <Button type="submit">Update</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
