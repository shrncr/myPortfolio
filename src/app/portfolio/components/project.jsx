import React from 'react';

export default function Project({ title, icon: Icon, skills, description, source, deployedLink }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all w-full max-w-sm">
      <div className="flex flex-col items-center text-center">
        <Icon className="text-slate-800 text-6xl mb-4" />
        <h3 className="text-2xl font-semibold text-black">{title}</h3>
        <p className="text-black mt-2">{description}</p>

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-pink-100 text-black text-xs font-semibold px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex gap-3">
          <a 
            href={source} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-600 hover:underline text-sm"
          >
            Source Code
          </a>
          {deployedLink && (
            <a 
              href={deployedLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline text-sm"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
