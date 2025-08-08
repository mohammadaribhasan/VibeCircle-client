import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import Page from "../Component/Page";
import Home from "../Pages/Home";
import Membership from "../Pages/Membership";
import Login from "../Pages/Login";
import Joinus from "../Pages/Joinus";
import Error from "../Pages/Error";
import PostDetails from "../Pages/PostDetails";
import PrivateRoute from "../Component/PrivateRoute";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile";
import AddPost from "../Pages/Dashboard/AddPost";
import MyPosts from "../Pages/Dashboard/MyPosts";
import Announcements from "../Pages/Announcements";
import AdminRoute from "../Pages/AdminRoute";

// ⛔️ MISSING imports (add these!)
import AdminLayout from "../Pages/AdminLayout";
import AdminProfile from "../Pages/Admin/AdminProfile";
import ManageUsers from "../Pages/Admin/ManageUsers";
import MakeAnnouncement from "../Pages/Admin/MakeAnnouncement";
import ReportedActivities from "../Pages/Admin/ReportedActivities";
import CommentsPage from "../Pages/CommentsPage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: (
                    <Page title="VibeCircle">
                        <Home />
                    </Page>
                ),
                loader: () => fetch("https://vibe-circle-sarver.vercel.app/api/posts"),
                hydrateFallbackElement: (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ),
                errorElement: <Error />,
            },
            {
                path: "/posts/:_id",
                element: (
                    <Page title="Post Details">
                        <PostDetails />
                    </Page>
                ),
                errorElement: <Error />,
            },
            {
                path: "/comments/:postId",
                element: (
                    <Page title="Comments">
                        <CommentsPage />
                    </Page>
                ),
                errorElement: <Error />,
            },
            {
                path: "/membership",
                element: (
                    <Page title="Membership">
                        <Membership />
                    </Page>
                ),
                errorElement: <Error />,
            },
            {
                path: "/login",
                element: (
                    <Page title="Login">
                        <Login />
                    </Page>
                ),
                errorElement: <Error />,
            },
            {
                path: "/joinus",
                element: (
                    <Page title="Join Us">
                        <Joinus />
                    </Page>
                ),
                errorElement: <Error />,
            },

            // 🔐 Dashboard (Private)
            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <DashboardLayout />
                    </PrivateRoute>
                ),
                errorElement: <Error />,
                children: [
                    {
                        index: true,
                        element: (
                            <Page title="My Profile">
                                <MyProfile />
                            </Page>
                        ),
                    },
                    {
                        path: "add-post",
                        element: (
                            <Page title="Add Post">
                                <AddPost />
                            </Page>
                        ),
                    },
                    {
                        path: "my-posts",
                        element: (
                            <Page title="My Posts">
                                <MyPosts />
                            </Page>
                        ),
                    },
                ],
            },

            // 📢 Public Announcements
            {
                path: "/announcements",
                element: (
                    <Page title="Announcements">
                        <Announcements />
                    </Page>
                ),
                errorElement: <Error />,
            },

            // 🛡 Admin Dashboard (Protected)
            {
                path: "/admin",
                element: (
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                ),
                errorElement: <Error />,
                children: [
                    { index: true, element: <Navigate to="profile" replace /> },
                    {
                        path: "profile",
                        element: (
                            <Page title="Admin Profile">
                                <AdminProfile />
                            </Page>
                        ),
                    },
                    {
                        path: "manage-users",
                        element: (
                            <Page title="Manage Users">
                                <ManageUsers />
                            </Page>
                        ),
                    },
                    {
                        path: "make-announcement",
                        element: (
                            <Page title="Make Announcement">
                                <MakeAnnouncement />
                            </Page>
                        ),
                    },
                    {
                        path: "reports",
                        element: (
                            <Page title="Reported Activities">
                                <ReportedActivities />
                            </Page>
                        ),
                    },
                ],
            },
        ],
    },
]);

export default router;
