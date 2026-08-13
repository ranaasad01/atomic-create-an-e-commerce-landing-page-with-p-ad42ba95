"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, ChevronRight, Lock, CreditCard, Truck, Package } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  paymentMethod: "card" | "paypal" | "apple";
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  cardName?: string;
}

// ─── Static order data ───────────────────────────────────────────────────────

const ORDER_ITEMS = [
  {
    id: 1,
    name: "Oversized Graphic Hoodie",
    category: "Hoodies",
    price: 64.99,
    qty: 1,
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8efbbf0a628344888c36691281089bc9.png",
  },
  {
    id: 2,
    name: "Slim Cargo Pants",
    category: "Bottoms",
    price: 89.99,
    qty: 1,
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/052271bbf5fb42bc865cd97b66c148c8.webp",
  },
  {
    id: 3,
    name: "Essential Crewneck Tee",
    category: "Tops",
    price: 34.99,
    qty: 2,
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/cfd08b86e11441c1b58eb295a741e166.jpg",
  },
];

const SUBTOTAL = 236.0;
const TAX = 18.88;
const TOTAL = 254.88;

// ─── Step config ─────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Shipping", icon: Truck },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Review", icon: Package },
];

const PAYMENT_OPTIONS = [
  { id: "card" as const, label: "Credit / Debit Card", icon: CreditCard },
  { id: "paypal" as const, label: "PayPal", icon: Package },
  { id: "apple" as const, label: "Apple Pay", icon: Lock },
];

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
];

// ─── Shared input class ───────────────────────────────────────────────────────

const inputCls =
  "bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none w-full transition-colors duration-200 placeholder:text-[var(--muted-foreground)] text-sm";

const errorCls = "text-[var(--primary)] text-xs mt-1";

// ─── Sub-components ──────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className={errorCls}>{msg}</p>;
}

// ─── Step 1: Shipping ────────────────────────────────────────────────────────

function StepShipping({
  formData,
  errors,
  onChange,
  onContinue,
}: {
  formData: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: string) => void;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
        Shipping Address
      </h2>

      {/* First + Last */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="Jane"
            className={inputCls}
          />
          <FieldError msg={errors.firstName} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Doe"
            className={inputCls}
          />
          <FieldError msg={errors.lastName} />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="jane@example.com"
            className={inputCls}
          />
          <FieldError msg={errors.email} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={inputCls}
          />
          <FieldError msg={errors.phone} />
        </div>
      </div>

      {/* Street */}
      <div>
        <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
          Street Address
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="123 Main Street, Apt 4B"
          className={inputCls}
        />
        <FieldError msg={errors.address} />
      </div>

      {/* City + State + ZIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="Los Angeles"
            className={inputCls}
          />
          <FieldError msg={errors.city} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
            State
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => onChange("state", e.target.value)}
            placeholder="CA"
            className={inputCls}
          />
          <FieldError msg={errors.state} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
            ZIP Code
          </label>
          <input
            type="text"
            value={formData.zip}
            onChange={(e) => onChange("zip", e.target.value)}
            placeholder="90001"
            className={inputCls}
          />
          <FieldError msg={errors.zip} />
        </div>
      </div>

      {/* Country */}
      <div>
        <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
          Country
        </label>
        <select
          value={formData.country}
          onChange={(e) => onChange("country", e.target.value)}
          className={inputCls + " cursor-pointer"}
        >
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onContinue}
        className="w-full mt-2 py-3.5 rounded-xl bg-[var(--primary)] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[var(--accent)] transition-colors duration-200 shadow-[0_4px_24px_rgba(233,69,96,0.35)]"
      >
        Continue to Payment
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}

// ─── Step 2: Payment ─────────────────────────────────────────────────────────

function StepPayment({
  formData,
  errors,
  onChange,
  onContinue,
  onBack,
}: {
  formData: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
        Payment Method
      </h2>

      {/* Method selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PAYMENT_OPTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange("paymentMethod", id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 text-sm font-semibold ${
              formData.paymentMethod === id
                ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)]"
                : "border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:border-[var(--primary)]/50"
            }`}
          >
            <Icon
              className={`w-5 h-5 ${
                formData.paymentMethod === id
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted-foreground)]"
              }`}
              aria-hidden="true"
            />
            {label}
          </button>
        ))}
      </div>

      {/* Card fields */}
      {formData.paymentMethod === "card" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 pt-2"
        >
          <div>
            <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
              Card Number
            </label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => onChange("cardNumber", e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={inputCls}
            />
            <FieldError msg={errors.cardNumber} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
                Expiry
              </label>
              <input
                type="text"
                value={formData.cardExpiry}
                onChange={(e) => onChange("cardExpiry", e.target.value)}
                placeholder="MM / YY"
                maxLength={7}
                className={inputCls}
              />
              <FieldError msg={errors.cardExpiry} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
                CVV
              </label>
              <input
                type="text"
                value={formData.cardCvv}
                onChange={(e) => onChange("cardCvv", e.target.value)}
                placeholder="123"
                maxLength={4}
                className={inputCls}
              />
              <FieldError msg={errors.cardCvv} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wide">
              Name on Card
            </label>
            <input
              type="text"
              value={formData.cardName}
              onChange={(e) => onChange("cardName", e.target.value)}
              placeholder="Jane Doe"
              className={inputCls}
            />
            <FieldError msg={errors.cardName} />
          </div>
        </motion.div>
      )}

      {formData.paymentMethod !== "card" && (
        <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] text-sm text-center">
          You will be redirected to{" "}
          <span className="text-[var(--foreground)] font-semibold">
            {formData.paymentMethod === "paypal" ? "PayPal" : "Apple Pay"}
          </span>{" "}
          to complete your payment securely.
        </div>
      )}

      {/* Security note */}
      <div className="flex items-center gap-2 text-[var(--muted-foreground)] text-xs">
        <Lock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        <span>Your payment information is encrypted with 256-bit SSL.</span>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-xl border border-[var(--border)] text-[var(--muted-foreground)] font-semibold text-sm hover:border-[var(--primary)]/50 hover:text-[var(--foreground)] transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="flex-[2] py-3.5 rounded-xl bg-[var(--primary)] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[var(--accent)] transition-colors duration-200 shadow-[0_4px_24px_rgba(233,69,96,0.35)]"
        >
          Review Order
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Review ──────────────────────────────────────────────────────────

function StepReview({
  formData,
  onBack,
  onPlace,
}: {
  formData: FormData;
  onBack: () => void;
  onPlace: () => void;
}) {
  const maskedCard =
    formData.paymentMethod === "card" && formData.cardNumber
      ? `**** **** **** ${formData.cardNumber.replace(/\s/g, "").slice(-4) || "****"}`
      : null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
        Review Your Order
      </h2>

      {/* Shipping summary */}
      <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
        <div className="flex items-center gap-2 mb-3">
          <Truck className="w-4 h-4 text-[var(--primary)]" aria-hidden="true" />
          <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">
            Shipping To
          </h3>
        </div>
        <p className="text-[var(--foreground)] text-sm">
          {formData.firstName} {formData.lastName}
        </p>
        <p className="text-[var(--muted-foreground)] text-sm">{formData.address}</p>
        <p className="text-[var(--muted-foreground)] text-sm">
          {formData.city}, {formData.state} {formData.zip}
        </p>
        <p className="text-[var(--muted-foreground)] text-sm">{formData.country}</p>
        <p className="text-[var(--muted-foreground)] text-sm mt-1">{formData.email}</p>
      </div>

      {/* Payment summary */}
      <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="w-4 h-4 text-[var(--primary)]" aria-hidden="true" />
          <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">
            Payment
          </h3>
        </div>
        {maskedCard ? (
          <p className="text-[var(--foreground)] text-sm font-mono">{maskedCard}</p>
        ) : (
          <p className="text-[var(--foreground)] text-sm capitalize">
            {formData.paymentMethod === "paypal" ? "PayPal" : "Apple Pay"}
          </p>
        )}
      </div>

      {/* Items */}
      <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-4 h-4 text-[var(--primary)]" aria-hidden="true" />
          <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">
            Items ({ORDER_ITEMS.length})
          </h3>
        </div>
        <div className="space-y-3">
          {ORDER_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover border border-[var(--border)] flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/fa3c52cc207a4cfa9680daf5d8aa157e.jpg";
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[var(--foreground)] text-sm font-medium truncate">
                  {item.name}
                </p>
                <p className="text-[var(--muted-foreground)] text-xs">
                  Qty: {item.qty}
                </p>
              </div>
              <p className="text-[var(--foreground)] text-sm font-bold flex-shrink-0">
                ${(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 text-[var(--muted-foreground)] text-xs">
        <Lock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        <span>Your order is protected by 256-bit SSL encryption.</span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-xl border border-[var(--border)] text-[var(--muted-foreground)] font-semibold text-sm hover:border-[var(--primary)]/50 hover:text-[var(--foreground)] transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={onPlace}
          className="flex-[2] py-3.5 rounded-xl bg-[var(--primary)] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[var(--accent)] transition-colors duration-200 shadow-[0_4px_24px_rgba(233,69,96,0.35)]"
        >
          <Lock className="w-4 h-4" aria-hidden="true" />
          Place Order
        </button>
      </div>
    </div>
  );
}

// ─── Order Summary Sidebar ───────────────────────────────────────────────────

function OrderSummary() {
  return (
    <div className="sticky top-24 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-[0_4px_32px_rgba(0,0,0,0.3)]">
      <h2 className="text-base font-bold text-[var(--foreground)] mb-5">
        Order Summary
      </h2>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {ORDER_ITEMS.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-xl object-cover border border-[var(--border)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/fa3c52cc207a4cfa9680daf5d8aa157e.jpg";
                }}
              />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-[10px] font-bold flex items-center justify-center">
                {item.qty}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[var(--foreground)] text-xs font-semibold leading-snug truncate">
                {item.name}
              </p>
              <p className="text-[var(--muted-foreground)] text-xs">
                {item.category}
              </p>
            </div>
            <p className="text-[var(--foreground)] text-sm font-bold flex-shrink-0">
              ${(item.price * item.qty).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] mb-4" />

      {/* Totals */}
      <div className="space-y-2.5 mb-5">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">Subtotal</span>
          <span className="text-[var(--foreground)] font-medium">
            ${SUBTOTAL.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">Shipping</span>
          <span className="text-green-400 font-semibold">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">Tax (8%)</span>
          <span className="text-[var(--foreground)] font-medium">
            ${TAX.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t border-[var(--border)] mb-4" />

      <div className="flex justify-between items-center mb-5">
        <span className="text-[var(--foreground)] font-bold">Total</span>
        <span className="text-[var(--primary)] text-xl font-extrabold">
          ${TOTAL.toFixed(2)}
        </span>
      </div>

      {/* SSL note */}
      <div className="flex items-center justify-center gap-2 text-[var(--muted-foreground)] text-xs">
        <Lock className="w-3.5 h-3.5" aria-hidden="true" />
        <span>SSL Secured Checkout</span>
      </div>
    </div>
  );
}

// ─── Step Progress Indicator ─────────────────────────────────────────────────

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, idx) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const Icon = step.icon;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                    : isActive
                    ? "bg-[var(--primary)]/15 border-[var(--primary)] text-[var(--primary)]"
                    : "bg-[var(--card)] border-[var(--border)] text-[var(--muted-foreground)]"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Icon className="w-4 h-4" aria-hidden="true" />
                )}
              </div>
              <span
                className={`text-xs font-semibold mt-1.5 ${
                  isActive
                    ? "text-[var(--primary)]"
                    : isCompleted
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)]"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-all duration-300 ${
                  currentStep > step.id
                    ? "bg-[var(--primary)]"
                    : "bg-[var(--border)]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  useTranslations(); // keep next-intl context alive

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validateShipping(): boolean {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validatePayment(): boolean {
    if (formData.paymentMethod !== "card") return true;
    const newErrors: FormErrors = {};
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required.";
    if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Expiry is required.";
    if (!formData.cardCvv.trim()) newErrors.cardCvv = "CVV is required.";
    if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleStep1Continue() {
    if (validateShipping()) setCurrentStep(2);
  }

  function handleStep2Continue() {
    if (validatePayment()) setCurrentStep(3);
  }

  // Slide direction: entering from right, exiting to left
  const variants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── HERO ── */}
        <Reveal>
          <div className="text-center mb-4">
            <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-2">
              Secure Checkout
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)] mb-8 text-balance">
              Checkout
            </h1>
          </div>
        </Reveal>

        {/* Step indicator */}
        <Reveal>
          <StepIndicator currentStep={currentStep} />
        </Reveal>

        {/* ── MAIN CONTENT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: Step form (2 cols) */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-[0_4px_32px_rgba(0,0,0,0.25)] overflow-hidden">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={variants}
                    initial="visible"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <StepShipping
                      formData={formData}
                      errors={errors}
                      onChange={handleChange}
                      onContinue={handleStep1Continue}
                    />
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={variants}
                    initial="visible"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <StepPayment
                      formData={formData}
                      errors={errors}
                      onChange={handleChange}
                      onContinue={handleStep2Continue}
                      onBack={() => setCurrentStep(1)}
                    />
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={variants}
                    initial="visible"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <StepReview
                      formData={formData}
                      onBack={() => setCurrentStep(2)}
                      onPlace={() =>
                        (window.location.href = "/order-confirmation")
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Back to cart */}
            <div className="mt-4 text-center">
              <Link
                href="/cart"
                className="text-[var(--muted-foreground)] text-sm hover:text-[var(--foreground)] transition-colors duration-200"
              >
                ← Back to Cart
              </Link>
            </div>
          </div>

          {/* Right: Order summary (1 col) */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
