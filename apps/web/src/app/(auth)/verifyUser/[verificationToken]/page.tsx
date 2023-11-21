import VeriflyUserForm from "../veriflyUserForm";

const VerifyUser = ({ params }: { params: { verificationToken: string } }) => {
  return (
    <div className="min-h-[92vh] flex justify-center items-center">
      <div className="min-w-full md:min-w-[90%] flex justify-center items-center">
        <div className=" w-[90%] md:w-[50%] flex justify-center items-center">
          {/* card */}
          <VeriflyUserForm params={params} />
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
