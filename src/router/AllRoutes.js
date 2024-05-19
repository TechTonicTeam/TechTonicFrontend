import NewsTape from "../pages/newsTape/NewsTape";
import NotFound from "../pages/notFound/NotFound";
import CurrentPost from "../pages/currentPost/CurrentPost";

export const userRoutes = [
    {
        path: "/",
        element: <NewsTape />,
        exact: true
    },
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: '/post/:post_id',
        element: <CurrentPost/>
    },
]

export const adminRoutes = [
    {
        path: "/",
        element: <NewsTape />,
        exact: true
    },
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: '/post/:post_id',
        element: <CurrentPost/>
    }
]