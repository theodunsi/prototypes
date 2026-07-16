import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import type { Project } from '../types'

interface Props {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: Props) {
  const navigate = useNavigate()

  return (
    <motion.article
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => navigate(`/project/${project.id}`)}
      className="group cursor-pointer bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-colors duration-300"
      style={{ willChange: 'transform' }}
    >
      {/* Image */}
      <motion.div
        layoutId={`card-image-${project.id}`}
        className="w-full overflow-hidden"
        style={{ height: '260px' }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        layoutId={`card-content-${project.id}`}
        className="p-6"
      >
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-mono text-text-secondary border border-border px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl font-medium text-text leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h2>

        <p className="text-sm text-text-secondary leading-relaxed">
          {project.description}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
          <span className="text-xs font-mono text-text-secondary">{project.year}</span>
          <span className="text-xs text-text-secondary">{project.role}</span>
        </div>
      </motion.div>
    </motion.article>
  )
}
