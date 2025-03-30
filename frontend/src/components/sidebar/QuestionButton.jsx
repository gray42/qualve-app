import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function QuestionButton() {
  return (
    <div>
      <Link to={"/post"}>
        <div className="py-4">
          <Button variant="contained" sx={{ color: "white" }}>
            Ask a Question...
          </Button>
        </div>
      </Link>
    </div>
  );
}
