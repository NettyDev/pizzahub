import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { prisma } from "@/lib/database";
import { transporter } from "./mail";
import { render } from "@react-email/components";
import { createElement } from "react";
import EmailVerification from "../../emails/EmailVerification";
import PasswordResetEmail from "../../emails/PasswordReset";
import Hello from "../../emails/Hello";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  plugins: [admin()],
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await transporter.sendMail({
        to: user.email,
        subject: "Verify your email address",
        text: `CLick the link to verify your email: ${url}`,
        html: await render(createElement(EmailVerification, { name: user.name, url }))
      });
    },
    onEmailVerification: async ({ name, email }) => {
      await transporter.sendMail({
        to: email,
        subject: "Email verified",
        text: `Your email has been successfully verified.`,
        html: await render(
          createElement(Hello, { name: name, url: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/menu` })
        )
      });
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await transporter.sendMail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
        html: await render(createElement(PasswordResetEmail, { name: user.name, url }))
      });
    }
  },
  user: {
    deleteUser: {
      enabled: true
    },
    additionalFields: {
      surname: {
        type: "string",
        required: true
      },
      phone: {
        type: "string",
        required: false
      },
      agreement1: {
        type: "boolean",
        defaultValue: true,
        required: true
      },
      agreement2: {
        type: "boolean",
        defaultValue: true,
        required: true
      },
      agreement3: {
        type: "boolean",
        defaultValue: true,
        required: true
      }
    }
  }
});
