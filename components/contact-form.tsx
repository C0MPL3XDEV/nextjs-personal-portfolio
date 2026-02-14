"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
    firstName: z.string().min(2, { message: "First name is too short" }),
    lastName: z.string().min(2, { message: "Last name is too short" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().optional(),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
    // Honeypot field - should remain empty
    companyWebsite: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
            companyWebsite: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        // Honeypot check
        if (data.companyWebsite) {
            // If honeypot is filled, simulate success but do nothing
            setStatus("success");
            reset();
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch(siteConfig.contact.formspreeEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
                reset();
            } else {
                const errorData = await response.json();
                if (Object.hasOwn(errorData, 'errors')) {
                    const messages = errorData.errors.map((e: any) => e.message).join(", ");
                    setErrorMessage(messages || "Oops! There was a problem submitting your form");
                } else {
                    setErrorMessage("Oops! There was a problem submitting your form");
                }
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setErrorMessage("Network error. Please try again later.");
            setStatus("error");
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 md:p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">


            {status === "success" ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 space-y-4 text-center"
                >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-xl font-bold">Message sent!</h4>
                    <p className="text-muted-foreground">
                        Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                    <button
                        onClick={() => setStatus("idle")}
                        className="mt-4 px-6 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                    >
                        Send another message
                    </button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                First name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                disabled={status === "loading"}
                                className={cn(
                                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                                    errors.firstName && "border-destructive focus-visible:ring-destructive"
                                )}
                                placeholder="Jane"
                                {...register("firstName")}
                                aria-invalid={!!errors.firstName}
                            />
                            {errors.firstName && (
                                <p className="text-sm text-destructive">{errors.firstName.message}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Last name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                disabled={status === "loading"}
                                className={cn(
                                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                                    errors.lastName && "border-destructive focus-visible:ring-destructive"
                                )}
                                placeholder="Doe"
                                {...register("lastName")}
                                aria-invalid={!!errors.lastName}
                            />
                            {errors.lastName && (
                                <p className="text-sm text-destructive">{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                disabled={status === "loading"}
                                className={cn(
                                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                                    errors.email && "border-destructive focus-visible:ring-destructive"
                                )}
                                placeholder="jane@example.com"
                                {...register("email")}
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Phone (optional)
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                disabled={status === "loading"}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                                placeholder="+1 (555) 000-0000"
                                {...register("phone")}
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Message
                        </label>
                        <textarea
                            id="message"
                            disabled={status === "loading"}
                            className={cn(
                                "flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-y",
                                errors.message && "border-destructive focus-visible:ring-destructive"
                            )}
                            placeholder="Tell me about your project..."
                            {...register("message")}
                            aria-invalid={!!errors.message}
                        />
                        {errors.message && (
                            <p className="text-sm text-destructive">{errors.message.message}</p>
                        )}
                    </div>

                    {/* Honeypot field (hidden) */}
                    <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                        <input type="text" tabIndex={-1} autoComplete="off" {...register("companyWebsite")} />
                    </div>

                    {/* Error Message */}
                    {status === "error" && (
                        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full h-11 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {status === "loading" ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            "Send Message"
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
