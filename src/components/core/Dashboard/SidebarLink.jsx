import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`
        group relative flex items-center gap-x-3 px-6 py-2 my-1 rounded-lg font-medium text-sm transition-all duration-200
        shadow-sm backdrop-blur-md
        ${matchRoute(link.path)
          ? "bg-gradient-to-r from-yellow-50/80 to-yellow-50/80 text-richblack-900 shadow-lg"
          : "bg-richblack-700/60 text-richblack-200 hover:bg-richblack-800/80 hover:text-yellow-50"}
      `}
    >
      <span
        className={`absolute left-0 top-0 h-full w-1 rounded-r-md bg-yellow-50 transition-all duration-200 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        }`}
      ></span>
      <Icon className={`text-lg transition-transform duration-200 ${matchRoute(link.path) ? "scale-110 text-yellow-900" : "group-hover:text-yellow-400 text-yellow-200"}`} />
      <span className="ml-1 tracking-wide">{link.name}</span>
    </NavLink>
  )
}