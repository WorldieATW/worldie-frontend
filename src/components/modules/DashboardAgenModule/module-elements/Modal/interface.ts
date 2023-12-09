import { AsetUsaha } from 'src/components/hooks/useAsetUsahaApi/interface'

export interface ModalProps {
  id?: string
  tipe?: string
  title?: string
  close: () => void
  onSave: () => void
  disableSave?: boolean
  asetUsaha?: AsetUsaha
}
