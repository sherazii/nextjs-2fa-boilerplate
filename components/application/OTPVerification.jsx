import React, { useState } from "react";
import axios from "axios"; // ✅ Make sure to import axios
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import ButtonLoading from "./ButtonLoading";
import { showToast } from "@/lib/showToast";

const OTPVerification = ({ email, onSubmit, loading }) => {
  const [isResendingOtp, setIsResendingOtp] = useState(false);

  // ✅ Create form schema (using picked zod rules)
  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  });

  // ✅ Setup React Hook Form with zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  // ✅ Submit handler for OTP verification
  const OtpVerficationHandler = async (values) => {
    const numericOTP = Number(values.otp);
    onSubmit({ ...values, otp: numericOTP });
  };

  // ✅ Resend OTP API handler
  const resendOtp = async () => {
    try {
      setIsResendingOtp(true);

      // 🚀 Call backend API to resend OTP
      const response = await axios.post("/api/auth/resend-otp", { email });

      // ✅ Handle response from backend
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to resend OTP");
      }

      showToast("success", response.data.message);
    } catch (error) {
      // ⚠️ Catch both network and API errors
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      showToast("error", errorMessage);
    } finally {
      setIsResendingOtp(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(OtpVerficationHandler)}
          className="space-y-8"
        >
          {/* 🧩 Header Section */}
          <div>
            <h2 className="text-2xl font-bold">
              Please Complete Verification!
            </h2>
            <p>We’ve sent an OTP to your email address.</p>
          </div>

          {/* 🧩 OTP Input Field */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-center flex-col">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      // ✅ Allow only numeric input
                      onChange={(value) => {
                        const numericValue = value.replace(/\D/g, ""); // remove non-numeric chars
                        field.onChange(numericValue);
                      }}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 🧩 Verify Button */}
          <ButtonLoading
            type="submit"
            className="w-70 rounded-full mt-4 cursor-pointer"
            text="Verify"
            loading={loading}
          />

          {/* 🧩 Resend OTP Button */}
          <div className="text-center">
            <button
              type="button"
              disabled={isResendingOtp}
              onClick={resendOtp}
              className={`text-blue-500 hover:underline cursor-pointer ${
                isResendingOtp ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isResendingOtp ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OTPVerification;