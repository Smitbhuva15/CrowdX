import { Banner } from '@/components/Banner/Banner'
import React from 'react'

const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 ">
      <div className="mb-8">
        <Banner title="Create a New Campaign" />
      </div>

      <form className="space-y-6 bg-[#0a0a0a] p-6 rounded-2xl  border border-[#1f1f1f] shadow-[#9674e6] shadow-lg">
        {/* Campaign Name */}
        <div>
          <label className="block text-sm font-semibold text-white mb-1">Campaign Name</label>
          <input
            type="text"
            placeholder="e.g. Education for All"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
          />
        </div>

        {/* Campaign Description */}
        <div>
          <label className="block text-sm font-semibold text-white mb-1">Campaign Description</label>
          <textarea
            id="description"
            placeholder="Describe the purpose of the campaign..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
          ></textarea>
        </div>

        {/* Campaign Image */}
        <div>
          <label className="block text-sm font-semibold text-white mb-1">Campaign Image</label>
          <input
            type="file"
            className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#8b5cf6] file:text-white hover:file:bg-[#7c3aed]"
          />
        </div>

        {/* Target Amount */}
        <div>
          <label className="block text-sm font-semibold text-white mb-1">Target Amount (in ETH)</label>
          <input
            type="number"
            placeholder="e.g. 100"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
          />
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration" className="block text-sm font-semibold text-white mb-1">
            Duration (in Days)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            min={1}
            placeholder="e.g. 30"
            className="w-full px-4 py-2 rounded-md border text-white border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 w-full "
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
    )
}

export default page