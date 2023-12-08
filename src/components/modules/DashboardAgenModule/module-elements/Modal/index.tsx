import { useEffect, useState } from 'react'
import { ModalProps } from './interface'
import { useAuthContext } from '@contexts'
import toast from 'react-hot-toast'

export const Modal: React.FC<ModalProps> = ({
  tipe,
  title,
  close,
  onSave,
  disableSave = false,
}) => {
  const { httpFetch } = useAuthContext()
  const [offsetY, setOffsetY] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [nama, setNama] = useState('')
  const [harga, setHarga] = useState(0)
  const [deskripsi, setDeskripsi] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [jenisKendaraan, setJenisKendaraan] = useState('')
  const [jenisPenginapan, setJenisPenginapan] = useState('')
  const [jalan, setJalan] = useState('')
  const [kota, setKota] = useState('')
  const [provinsi, setProvinsi] = useState('')
  const [negara, setNegara] = useState('')

  const handleSave = async () => {
    const data = {
      nama: nama,
      harga: harga,
      deskripsi: deskripsi,
      tipe: tipe,
      imgUrl: imgUrl,
      jenisKendaraan: jenisKendaraan,
      jenisPenginapan: jenisPenginapan,
      jalan: jalan,
      kota: kota,
      provinsi: provinsi,
      negara: negara,
    }

    const { response} = await httpFetch({
      method: 'post',
      url: `aset-usaha/${handleUrl()}`,
      isAuthorized: true,
      body: data,
    })

    if (response) {
      toast.success(response.responseMessage)
    } else {
      toast.error('Pastikan sudah benar gan')
    }

    onSave()
    close()
  }

  const handleUrl = () => {
    if (tipe === 'DESTINASI_WISATA') return 'tourist-attraction'
    else if (tipe === 'TRANSPORTASI') return 'transportation'
    else return 'accomodation'
  }

  useEffect(() => {
    setOffsetY(window.scrollY)
    setOffsetX(window.scrollX)
  }, [window.scrollY, window.scrollX])

  return (
    <div
      className="flex justify-center items-center font-poppins absolute h-full w-full bg-black/50"
      style={{
        top: offsetY,
        left: offsetX,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close && close()
        }
      }}
    >
      <div className="flex flex-col bg-white border-2 border-royal rounded-2xl p-8 gap-4">
        <span className="text-xl 2xl:text-2xl font-paytone">{title}</span>

        <div className="flex gap-x-10">
          <div className="flex flex-col gap-2">
            <span>Name</span>
            <input
              type="text"
              className="rounded-lg bg-grayjoy/10 text-black p-2 outline-royal"
              onChange={(e) => setNama(e.target.value)}
            />
            <span>Price</span>
            <input
              type="number"
              className="rounded-lg bg-grayjoy/10 text-black p-2 outline-royal"
              onChange={(e) => setHarga(Number(e.target.value))}
            />
            <span>Description</span>
            <textarea
              className="rounded-lg bg-grayjoy/10 text-black p-2 outline-royal"
              onChange={(e) => setDeskripsi(e.target.value)}
            />
            <span>Image URL</span>
            <input
              type="text"
              className="rounded-lg bg-grayjoy/10 text-black p-2 outline-royal"
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            {tipe === 'TRANSPORTASI' && (
              <>
                <span>Transportation Type</span>
                <select
                  className="rounded-lg bg-grayjoy/10 text-black p-2 outline-royal"
                  onChange={(e) => setJenisKendaraan(e.target.value)}
                >
                  <option value="MOBIL">Mobil</option>
                  <option value="MOTOR">Motor</option>
                  <option value="BUS">Bus</option>
                  <option value="MINIBUS">Minibus</option>
                  <option value="KERETA">Kereta</option>
                  <option value="PESAWAT">Pesawat</option>
                </select>
              </>
            )}
            {tipe === 'PENGINAPAN' && (
              <>
                <span>Accomodation Type</span>
                <select
                  className="rounded-lg bg-grayjoy/10 text-black p-2 outline-royal"
                  onChange={(e) => setJenisPenginapan(e.target.value)}
                >
                  <option value="HOTEL">Hotel</option>
                  <option value="VILLA">Villa</option>
                  <option value="KOST">Kost</option>
                  <option value="KONTRAKAN">Kontrakan</option>
                </select>
              </>
            )}
            {(tipe === 'PENGINAPAN' || tipe === 'DESTINASI_WISATA') && (
              <>
                <span>Street</span>
                <input
                  type="text"
                  className="rounded-lg bg-grayjoy/10 text-black p-2 outline-royal"
                  onChange={(e) => setJalan(e.target.value)}
                />
                <span>City</span>
                <input
                  type="text"
                  className="rounded-lg bg-grayjoy/10 text-black p-2 outline-royal"
                  onChange={(e) => setKota(e.target.value)}
                />
                <span>Province</span>
                <input
                  type="text"
                  className="rounded-lg bg-grayjoy/10 text-black p-2 outline-royal"
                  onChange={(e) => setProvinsi(e.target.value)}
                />
                <span>Country</span>
                <input
                  type="text"
                  className="rounded-lg bg-grayjoy/10 text-black p-2 outline-royal"
                  onChange={(e) => setNegara(e.target.value)}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-2 font-bold">
          <button
            className="text-royal hover:underline hover:text-opacity-90"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 bg-royal rounded-lg text-white hover:bg-opacity-90"
            disabled={disableSave}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
