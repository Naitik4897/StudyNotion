import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar({ isOpen, onClose }) {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          fixed md:relative
          top-0 left-0
          z-50
          flex h-[calc(100vh-3.5rem)] min-w-[230px] max-w-[270px] flex-col
          border-r border-r-richblack-700
          bg-gradient-to-b from-richblack-900/90 via-richblack-800/90 to-richblack-700/80
          shadow-2xl rounded-r-2xl md:rounded-none py-8 px-2
          transition-transform duration-300 ease-in-out
          backdrop-blur-md
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-2 text-richblack-25 hover:text-yellow-25 bg-richblack-900/70 rounded-full shadow-md"
        >
          <AiOutlineClose className="text-xl" />
        </button>

        <div className="flex flex-col mt-8 md:mt-0 gap-1">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <div key={link.id} onClick={onClose}>
                <SidebarLink link={link} iconName={link.icon} />
              </div>
            )
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1.5px] w-10/12 bg-gradient-to-r from-yellow-25/60 to-richblack-700/60 rounded-full" />
        <div className="flex flex-col gap-1">
          <div onClick={onClose}>
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
          </div>
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="group px-6 py-2 my-1 rounded-lg text-sm font-medium text-richblack-300 hover:bg-richblack-800/80 hover:text-yellow-400 transition-all duration-200 flex items-center gap-x-2"
          >
            <VscSignOut className="text-lg group-hover:text-yellow-25 transition-colors duration-200" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}