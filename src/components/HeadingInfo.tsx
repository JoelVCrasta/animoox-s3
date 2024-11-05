import { Upload } from "lucide-react"
import { RotatingLines } from "react-loader-spinner"

interface IHeadingInfo {
  title: string
  handleSaveAsDraft: () => void
  handlePublishProduct: () => void
  loading?: boolean
}

const HeadingInfo = ({
  title,
  handleSaveAsDraft,
  handlePublishProduct,
  loading,
}: IHeadingInfo) => {
  return (
    <div className="flex flex-col gap-y-2 md:flex-row items-start md:items-center justify-between py-4">
      <h2 className="font-semibold text-lg text-gray-700">{title}</h2>

      <div className="w-full md:w-fit flex justify-between space-x-4">
        <button
          onClick={handleSaveAsDraft}
          className="py-3 px-6 font-semibold text-gray-400 border-2 border-gray-400 rounded-full text-sm"
        >
          Save as draft
        </button>

        <button
          onClick={handlePublishProduct}
          className="py-3 px-4 text-sm font-semibold bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 flex items-center"
        >
          {loading ? (
            <RotatingLines width="20" strokeColor="white" />
          ) : (
            <>
              <Upload size={20} className="mr-2" />
              <p>Publish Product</p>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default HeadingInfo
