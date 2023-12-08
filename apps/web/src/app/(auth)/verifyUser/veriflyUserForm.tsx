"use client";

import { useMutation } from "@apollo/client";
import { ImCross } from "react-icons/im";
import { IoCheckmarkCircle } from "react-icons/io5";
import { VerifyUserDocument } from "@/graphql/__generated__/graphql";
import { Loader } from "@notifly/ui";
import { Button } from "@notifly/ui";
import { useRouter } from "next/navigation";

const VeriflyUserForm = ({ params }: { params: { verificationToken: string } }) => {
  const [verifyUser, { data, loading, error }] = useMutation(VerifyUserDocument);
  const router = useRouter();

  const verify = () => {
    verifyUser({
      variables: {
        verificationToken: params.verificationToken,
      },
    });
  };

  return (
    <div className="border border-c_Litegrey rounded-lg w-[90%] md:w-[60%] h-[18rem] flex flex-col gap-4 justify-center items-center py-10">
      <div className="flex flex-col justify-center items-center gap-5 font-semibold">
        {loading && <Loader />}

        {error && (
          <div className="flex flex-col gap-4 items-center">
            <ImCross className="text-4xl" />
            {error.message}
          </div>
        )}
        {data && (
          <div className="flex flex-col gap-4 items-center">
            <IoCheckmarkCircle className="text-[4rem]" />
            {data?.verifyUser?.message}
            <Button
              onClick={() => (router.replace("/", { scroll: false }), router.refresh())}
              variant={"primary"}
              size={"small"}
            >
              Back to Home
            </Button>
          </div>
        )}

        {!data && (
          <Button onClick={() => verify()} variant={"primary"} size={"small"} disabled={loading}>
            Click to Verify
          </Button>
        )}
      </div>
    </div>
  );
};

export default VeriflyUserForm;
