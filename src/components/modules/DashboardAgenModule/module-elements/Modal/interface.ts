export interface ModalProps {
  tipe: string
  title?: string
  close: () => void
  onSave: () => void
  disableSave?: boolean
}
