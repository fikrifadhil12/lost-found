import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadForm = ({ onItemAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    finderName: "",
    image: null,
    previewImage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          previewImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate ID unik
    const newItem = {
      id: Date.now(),
      name: formData.name,
      location: formData.location,
      phone: formData.phone,
      finderName: formData.finderName,
      image: formData.previewImage,
      dateFound: new Date().toLocaleDateString("id-ID"),
    };

    // Panggil fungsi dari parent untuk menambahkan item baru
    onItemAdded(newItem);

    // Reset form
    setFormData({
      name: "",
      location: "",
      phone: "",
      finderName: "",
      image: null,
      previewImage: "",
    });

    // Redirect ke halaman daftar barang
    navigate("/search");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Info Barang</h2>
      <form onSubmit={handleSubmit}>
        {/* Upload Gambar */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Gambar Barang</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {formData.previewImage ? (
              <div className="mb-2">
                <img
                  src={formData.previewImage}
                  alt="Preview"
                  className="h-32 w-full object-contain mx-auto"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, previewImage: "", image: null })
                  }
                  className="text-red-500 text-sm mt-2"
                >
                  Hapus Gambar
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-500">
                  Seret atau klik untuk upload gambar
                </p>
                <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 cursor-pointer">
                  Pilih File
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </>
            )}
          </div>
        </div>

        {/* Nama Barang */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nama Barang</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
            placeholder="Contoh: iPhone 13"
            required
          />
        </div>

        {/* Lokasi Ditemukan */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Lokasi Ditemukan</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
            placeholder="Contoh: Ruang Aula"
            required
          />
        </div>

        {/* Nomor HP */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nomor HP</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
            placeholder="Contoh: 082123456789"
            required
          />
        </div>

        {/* Nama Penemu */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Nama Penemu</label>
          <input
            type="text"
            name="finderName"
            value={formData.finderName}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
            placeholder="Nama Anda"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors"
        >
          Upload Barang
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
