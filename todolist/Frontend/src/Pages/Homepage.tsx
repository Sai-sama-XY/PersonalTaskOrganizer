import DateProg from "@/components/ui/dateprog";
import InProg from "@/components/ui/inprog";
import UpComing from "@/components/ui/upcoming";

function Homepage() {
  return (
    <div className="flex flex-row gap-3">
      <div className="grow-2 flex flex-col gap-5">
        <div>
          <DateProg />
        </div>
        <div>
          <InProg />
        </div>
      </div>
      <div className="grow-1">
        <UpComing />
      </div>
    </div>
  );
}
export default Homepage;
