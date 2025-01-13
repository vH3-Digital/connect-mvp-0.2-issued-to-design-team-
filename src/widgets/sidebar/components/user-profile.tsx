import React, { useState } from "react";
import { Camera, Mail, Phone, Building } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { Modal } from "../../modal/modal";
import { CustomButton } from "../../custom-button";
import { FormField } from "../../form-field";

export const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profile_picture?.url || null
  );
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement profile update API call
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const getInitial = () => {
    if (!user?.first_name) return user?.email?.[0]?.toUpperCase() || "?";
    return user.first_name[0].toUpperCase();
  };

  const getDisplayName = () => {
    if (!user) return "Loading...";
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user.email || "No email provided";
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-wrap items-start gap-6">
        <div className="relative group w-24 h-24">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-700">
            {profileImage || user.profile_picture?.url ? (
              <img
                src={profileImage || user.profile_picture?.url}
                alt={getDisplayName()}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                {getInitial()}
              </div>
            )}
          </div>
          {isEditing && (
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer rounded-full transition-opacity">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Camera className="w-6 h-6 text-white" />
            </label>
          )}
        </div>

        <div className="w-full sm:w-auto sm:flex-1">
          <div className="sm:flex sm:items-start sm:justify-between mb-4">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-xl sm:text-2xl font-semibold">
                {getDisplayName()}
              </h2>
              <p className="text-primary">{user.email}</p>
            </div>
            <CustomButton
              onClick={() => setIsEditing(!isEditing)}
              extraStyles=""
              title={isEditing ? "Save Changes" : "Edit Profile"}
            />
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  label="First Name"
                  type="name"
                  placeholder="Enter first name"
                  value={formData.first_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                />
                <FormField
                  label="Last Name"
                  type="text"
                  placeholder="Enter last name"
                  value={formData.last_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                />
              </div>
              <FormField
                label="Email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <FormField
                label="Phone"
                type="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </form>
          ) : (
            <div className="flex flex-wrap ">
              <div className="flex items-center gap-2 text-gray-400 mb-2 w-full sm:w-[50%] sm:mb-0">
                <Mail className="w-4 h-4 text-white" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 sm:w-[50%]">
                <Phone className="w-4 h-4 text-white" />
                <span>{user.phone || "Not set"}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Company Information */}
      {user.company_id && (
        <div className="bg-bgSecondary rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Company Information</h3>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full mb-2 sm:mb-0 sm:w-[calc(50%-10px)]">
              <div className="text-sm text-gray-400">Company ID</div>
              <div>{user.company_id}</div>
            </div>
            <div className="w-full sm:w-[calc(50%-10px)]">
              <div className="text-sm text-gray-400">Workspace ID</div>
              <div>{user.ws_id || "Not set"}</div>
            </div>
          </div>
        </div>
      )}

      {/* Account Information */}
      <div className="bg-bgSecondary rounded-lg p-4">
        <h3 className="font-medium mb-3">Account Information</h3>
        <div className="space-y-2">
          <div>
            <div className="text-sm text-gray-400">User ID</div>
            <div>{user.id}</div>
          </div>
          {user.google_oauth && (
            <div>
              <div className="text-sm text-gray-400">Google Account</div>
              <div>{user.google_oauth.email}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
