'use client'

import { ReactNode, forwardRef, useRef } from "react"

type DialogComponentProps = {
  children: ReactNode,
  toggleDialog: () => void
}

export const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  function toggleDialog() {
    if (!dialogRef.current) { return }

    dialogRef.current.hasAttribute('open')
      ? dialogRef.current.close()
      : dialogRef.current.showModal()
  }

  const DialogComponent = forwardRef<HTMLDialogElement, DialogComponentProps>(
    function DialogComponent({children, toggleDialog}, dialogRef) {
      return (
        <dialog
          ref={dialogRef}
          className="bg-transparent overflow-visible"
          onClick={(e) => {
            if (e.currentTarget === e.target) {
              toggleDialog()
            }
          }}
        >
          {children}
        </dialog>
      )
    }
  )

  return {
    dialogRef: dialogRef,
    toggleDialog: toggleDialog,
    Dialog: DialogComponent
  }

}

