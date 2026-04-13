"use client"

import { useState } from "react"
import { User, Phone, Mail, MapPin, Pencil } from "lucide-react"

export default function CustomerProfile() {
  const [isEditing, setIsEditing] = useState(false)

  const [profile, setProfile] = useState({
    name: "mungkung",
    username: "ventrakn123",
    phone: "081234567890",
    email: "batutu@gmail.com",
    address: "Malang, Jawa Timur"
  })

  function handleChange(e: any) {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {profile.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold mt-4 text-gray-800">Customer Profile</h1>
          <p className="text-gray-500 text-sm">Manage your account</p>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Name */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <User className="text-indigo-500" />
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-transparent w-full outline-none"
            />
          </div>

          {/* Username */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <User className="text-indigo-500" />
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-transparent w-full outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <Phone className="text-indigo-500" />
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-transparent w-full outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <Mail className="text-indigo-500" />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-transparent w-full outline-none"
            />
          </div>

          {/* Address */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <MapPin className="text-indigo-500" />
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-transparent w-full outline-none"
            />
          </div>

        </div>

        {/* Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-6 w-full bg-indigo-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition"
        >
          <Pencil size={18} />
          {isEditing ? "Save" : "Edit Profile"}
        </button>

      </div>
    </div>
  )
}
