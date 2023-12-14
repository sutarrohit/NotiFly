import MyNotificationForm from "./MyNotificationForm";

const page = () => {
  return (
    <div className="min-h-screen flex justify-center mb-20">
      <div className="w-[90%] flex flex-col items-center">
        <div className="flex justify-center">
          <h1 className="py-4 md:py-8 font-bold text-2xl md:text-3xl">My Notifications</h1>
        </div>

        {/* card */}
        <MyNotificationForm />
      </div>
    </div>
  );
};

export default page;
