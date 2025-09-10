"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import apiCall from "@/components/utils/apiCall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserPlus,
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  GraduationCap,
  Mail,
  User,
  Calendar,
  MapPin,
  Phone,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import styled from "styled-components";

// Enhanced styled components
const StyledContainer = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const ElegantLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
  }
`;

const LogoText = styled.span`
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  font-family: "Inter", "Segoe UI", sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border-radius: 2px;
    opacity: 0.8;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

const PageSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin: 0;
`;

const EnhancedCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const FormSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidthField = styled.div`
  grid-column: 1 / -1;
`;

const UploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  background: #f9fafb;

  &:hover {
    border-color: #667eea;
    background: #f0f4ff;
  }

  &.drag-over {
    border-color: #667eea;
    background: #f0f4ff;
    transform: scale(1.02);
  }
`;

const FileList = styled.div`
  margin-top: 16px;
  space-y: 8px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f0f4ff;
  border-radius: 8px;
  border: 1px solid #e0e7ff;
`;

const SuccessMessage = styled(motion.div)`
  padding: 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  border: 1px solid #34d399;
  color: #065f46;
  margin-bottom: 16px;
`;

const ErrorMessage = styled(motion.div)`
  padding: 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 1px solid #f87171;
  color: #991b1b;
  margin-bottom: 16px;
`;

export default function AddChild() {
  const accesstoken = useSelector((state) => state.auth.accessToken);
  const CLOUD_NAME = "dur1dba1a";
  const UPLOAD_PRESET = "student_docs_unsigned";

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    gender: "",
    national_id: "",
    address: "",
    phone: "",
    emergency_contact: "",
    medical_info: "",
    docs_url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadUrls, setUploadUrls] = useState([]);
  const [message, setMessage] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      return false;
    }
    if (!validateEmail(formData.email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return false;
    }
    if (!formData.docs_url) {
      setMessage({ type: "error", text: "Please upload required documents." });
      return false;
    }
    return true;
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setMessage(null);
    const folderId = `student_docs/${uuidv4()}`;

    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", UPLOAD_PRESET);
          data.append("folder", folderId);

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
            data
          );
          return res.data.secure_url;
        })
      );
      setUploadUrls(urls);
      setFormData((prev) => ({ ...prev, docs_url: folderId }));
      setMessage({
        type: "success",
        text: `${files.length} file(s) uploaded successfully!`,
      });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Upload failed. Please try again." });
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      // Create a synthetic event object
      const syntheticEvent = {
        target: { files: files },
      };
      handleFileUpload(syntheticEvent);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await apiCall(
        "post",
        "/api/students/add-child",
        formData,
        {
          token: accesstoken,
        }
      );
      setMessage({
        type: "success",
        text: "Child added successfully! Registration is pending approval.",
      });
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        date_of_birth: "",
        gender: "",
        national_id: "",
        address: "",
        phone: "",
        emergency_contact: "",
        medical_info: "",
        docs_url: "",
      });
      setUploadUrls([]);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to add child. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledContainer>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <ElegantLogo>
            <LogoIcon>
              <GraduationCap size={24} color="#ffffff" />
            </LogoIcon>
            <LogoText>Dirassati</LogoText>
          </ElegantLogo>
          <PageTitle>Add New Child</PageTitle>
          <PageSubtitle>
            Register your child for enrollment at our school
          </PageSubtitle>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {message.type === "success" ? (
              <SuccessMessage>
                <CheckCircle className="w-5 h-5 inline mr-2" />
                {message.text}
              </SuccessMessage>
            ) : (
              <ErrorMessage>
                <XCircle className="w-5 h-5 inline mr-2" />
                {message.text}
              </ErrorMessage>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <EnhancedCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-blue-600" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <FormSection>
                  <SectionTitle>
                    <User className="w-5 h-5" />
                    Personal Details
                  </SectionTitle>
                  <FormGrid>
                    <div>
                      <Label htmlFor="first_name">First Name *</Label>
                      <Input
                        id="first_name"
                        type="text"
                        placeholder="Enter first name"
                        value={formData.first_name}
                        onChange={(e) =>
                          handleChange("first_name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name *</Label>
                      <Input
                        id="last_name"
                        type="text"
                        placeholder="Enter last name"
                        value={formData.last_name}
                        onChange={(e) =>
                          handleChange("last_name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="date_of_birth">Date of Birth</Label>
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) =>
                          handleChange("date_of_birth", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => handleChange("gender", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">Male</SelectItem>
                          <SelectItem value="F">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="national_id">National ID</Label>
                      <Input
                        id="national_id"
                        type="text"
                        placeholder="National ID number"
                        value={formData.national_id}
                        onChange={(e) =>
                          handleChange("national_id", e.target.value)
                        }
                      />
                    </div>
                  </FormGrid>
                </FormSection>

                {/* Contact Information */}
                <FormSection>
                  <SectionTitle>
                    <Phone className="w-5 h-5" />
                    Contact Information
                  </SectionTitle>
                  <FormGrid>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+213 XX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency_contact">
                        Emergency Contact
                      </Label>
                      <Input
                        id="emergency_contact"
                        type="tel"
                        placeholder="Emergency contact number"
                        value={formData.emergency_contact}
                        onChange={(e) =>
                          handleChange("emergency_contact", e.target.value)
                        }
                      />
                    </div>
                    <FullWidthField>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Full address"
                        value={formData.address}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                        rows={3}
                      />
                    </FullWidthField>
                  </FormGrid>
                </FormSection>

                {/* Medical Information */}
                <FormSection>
                  <SectionTitle>
                    <AlertCircle className="w-5 h-5" />
                    Medical Information
                  </SectionTitle>
                  <FullWidthField>
                    <Label htmlFor="medical_info">
                      Medical Conditions/Allergies
                    </Label>
                    <Textarea
                      id="medical_info"
                      placeholder="Please provide any medical conditions, allergies, or special needs"
                      value={formData.medical_info}
                      onChange={(e) =>
                        handleChange("medical_info", e.target.value)
                      }
                      rows={4}
                    />
                  </FullWidthField>
                </FormSection>

                {/* Document Upload */}
                <FormSection>
                  <SectionTitle>
                    <Upload className="w-5 h-5" />
                    Required Documents *
                  </SectionTitle>
                  <FullWidthField>
                    <UploadArea
                      className={dragOver ? "drag-over" : ""}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() =>
                        document.getElementById("file-upload").click()
                      }
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Upload Student Documents
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Drag and drop files here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supported formats: PDF, JPG, JPEG, PNG (Max 10MB each)
                      </p>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </UploadArea>

                    {uploading && (
                      <div className="mt-4 text-center">
                        <div className="inline-flex items-center gap-2 text-blue-600">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                          Uploading files...
                        </div>
                      </div>
                    )}

                    {uploadUrls.length > 0 && (
                      <FileList>
                        {uploadUrls.map((url, i) => (
                          <FileItem key={i}>
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700">
                              Document {i + 1}
                            </span>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm ml-auto"
                            >
                              View
                            </a>
                          </FileItem>
                        ))}
                      </FileList>
                    )}
                  </FullWidthField>
                </FormSection>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || uploading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Adding Child...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Child
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </EnhancedCard>
        </motion.div>
      </div>
    </StyledContainer>
  );
}
