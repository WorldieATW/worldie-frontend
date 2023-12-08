export interface ModalProps {
  id?: string
  tipe?: string
  title?: string
  close: () => void
  onSave: () => void
  disableSave?: boolean
}
