import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col mb-20 ">
        <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
            Contact Us
        </h1>
        <p className="">
            Tell us more about yourself and what you&apos;re got in mind.
        </p>

        <div className="mt-7">
            <ContactUsForm />
        </div>
    </div>
  );
};

export default ContactForm;