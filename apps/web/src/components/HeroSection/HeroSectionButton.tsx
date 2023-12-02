import { Button } from "@notifly/ui";

const HeroSectionButton = () => {
  return (
    <div className="w-[100%] flex justify-center ">
      <Button
        variant={"primary"}
        size={"small"}
        className="w-[90%] md:w-[80%] py-2 bg-c_White text-c_black font-bold"
      >
        Create
      </Button>
    </div>
  );
};

export default HeroSectionButton;
