import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { prisma } from "@/lib/database";
import { transporter } from "./mail";
import { render } from "@react-email/components";
import { createElement } from "react";
import EmailVerification from "../../emails/EmailVerification";

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
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  user: {
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
