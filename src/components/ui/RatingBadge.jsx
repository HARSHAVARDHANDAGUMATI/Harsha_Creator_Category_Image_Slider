import { FiStar } from 'react-icons/fi'

const RatingBadge = ({ rating, reviews }) => {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-slate-950/50 px-2.5 py-1 text-[11px] font-semibold text-slate-100 backdrop-blur-md">
      <FiStar className="text-amber-300" />
      <span>{rating}</span>
      <span className="text-slate-400">({reviews})</span>
    </div>
  )
}

export default RatingBadge
