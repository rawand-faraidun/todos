import { Fragment, useEffect, useState } from 'react'
import { Dialog as DialogComponent, Transition } from '@headlessui/react'

/**
 * Dialog
 *
 * @param {Object} props - component props
 * @param {Boolean} props.show - is dialog shown?
 * @param {React.ReactNode} props.header - dialog header
 * @param {React.ReactNode} props.body - dialog body
 * @param {Object} props.closeButton - dialog close button
 * @param {Boolean} props.closeButton.show - is close button shown?
 * @param {Boolean} props.closeButton.text - close button text
 * @param {Function} props.onClose - dialog close handler
 * @param {Object} [props.acceptButton] - dialog accept button
 * @param {Boolean} [props.acceptButton.show] - is accept button shown?
 * @param {Boolean} [props.acceptButton.text] - accept button text
 * @param {Boolean} [props.acceptButton.onAccept] - accept button handler
 *
 * @returns dialog component
 */
export default function Dialog({ show, header, body, closeButton, onClose, acceptButton }) {
  closeButton = { text: 'Close', show: true, ...closeButton }
  acceptButton = {
    text: 'Accept',
    show: false,
    onAccept: () => {},
    ...acceptButton
  }

  const [showState, setShowState] = useState(show)

  const handleClose = () => {
    setShowState(false)
    onClose()
  }

  useEffect(() => {
    setShowState(show)
  }, [show])

  return (
    <div>
      <Transition
        show={showState}
        appear
        as={Fragment}
        enter="transition duration-300"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition duration-200"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <DialogComponent as="div" className="fixed inset-0 z-10" onClose={handleClose}>
          {/* background overlay */}
          <Transition.Child
            as={Fragment}
            enter="transition duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogComponent.Overlay className="fixed inset-0 bg-gray-900/30 backdrop-blur-md transition-all" />
          </Transition.Child>

          {/* dialog */}
          <div
            className="p-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md text-start
              bg-white shadow-xl rounded-md z-20"
          >
            {/* dialog header */}
            <div className="text-lg">{header}</div>

            {/* dialog body */}
            <div className="mt-5 text-gray-700">{body}</div>

            {/* dialog footer */}
            {(closeButton.show || acceptButton.show) && (
              <div className="mt-6 flex flex-row-reverse gap-4">
                {acceptButton.show && (
                  <button
                    className="p-2.5 text-white bg-teal-500 hover:bg-teal-700 rounded-md outline-none transition duration-200"
                    onClick={() => {
                      handleClose()
                      acceptButton.onAccept()
                    }}
                  >
                    {acceptButton.text}
                  </button>
                )}
                {closeButton.show && (
                  <button
                    className="p-2.5 text-white bg-rose-500 hover:bg-rose-700 rounded-md outline-none transition duration-200"
                    onClick={handleClose}
                  >
                    {closeButton.text}
                  </button>
                )}
              </div>
            )}
          </div>
        </DialogComponent>
      </Transition>
    </div>
  )
}
