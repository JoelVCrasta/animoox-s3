import { Upload } from "lucide-react"

interface IHeadingInfo {
  title: string
  handleSaveAsDraft: () => void
  handlePublishProduct: () => void
}

const HeadingInfo = ({
  title,
  handleSaveAsDraft,
  handlePublishProduct,
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
          className="py-3 px-6 text-sm font-semibold bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <Upload size={20} className="mr-2" />
          Publish product
        </button>
      </div>
    </div>
  )
}

export default HeadingInfo
