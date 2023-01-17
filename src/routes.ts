import pageFriend from "./components/pageFriend";
import { friend } from "./const/const";

export const friendLink = [
    {
        path: friend + "/:id",
        Component: pageFriend
    }
]