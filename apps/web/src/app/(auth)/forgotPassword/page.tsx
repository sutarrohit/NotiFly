import ForgotPasswordForm from "./forgotPasswordForm";

const forgotPassword = () => {
  return (
    <div className="min-h-[92vh] flex justify-center items-center">
      <div className="min-w-[90%] md:border md:border-c_Litegrey rounded-lg grid md:grid-cols-2 h-[85vh] overflow-hidden">
        {/* left */}
        <div className="bg-c_black dark:bg-c_grey text-c_White hidden md:block">Left Side</div>
        <div className="flex justify-center items-center">
          {/* card */}
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default forgotPassword;
