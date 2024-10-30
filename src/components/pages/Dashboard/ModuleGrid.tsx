import { ModuleCard } from './ModuleCard';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  ClipboardCheck, 
  Users, 
  BookOpen, 
  Brain, 
  FileText, 
  Target, 
  Megaphone,
  Database,
  Palette
} from 'lucide-react';

interface ModuleGridProps {
  progress: {
    regulatory: number;
    startup: number;
    recruitment: number;
    training: number;
    marketing: number;
  };
}

export function ModuleGrid({ progress }: ModuleGridProps) {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'irb',
      title: 'IRB Materials',
      description: 'Generate comprehensive IRB submission documents',
      icon: <Building className="h-6 w-6" />,
      path: '/irb-materials',
      progress: progress.regulatory,
      status: 'In Progress',
      badge: 'Priority'
    },
    {
      id: 'ecrf',
      title: 'eCRF Builder',
      description: 'Design and optimize electronic Case Report Forms with AI assistance',
      icon: <Database className="h-6 w-6" />,
      path: '/ecrf',
      progress: progress.startup,
      status: 'Active',
      badge: 'New'
    },
    {
      id: 'marketing',
      title: 'Marketing Suite',
      description: 'Create professional recruitment and marketing materials',
      icon: <Megaphone className="h-6 w-6" />,
      path: '/marketing',
      progress: progress.marketing,
      status: 'Active',
      badge: 'Enhanced',
      features: [
        'Social Media Campaigns',
        'Print Materials',
        'Email Templates',
        'Digital Ads'
      ]
    },
    {
      id: 'recruitment',
      title: 'Recruitment Materials',
      description: 'Design and generate recruitment materials',
      icon: <Users className="h-6 w-6" />,
      path: '/recruitment-materials',
      progress: progress.recruitment,
      status: 'Active',
      badge: 'Marketing'
    },
    {
      id: 'training',
      title: 'Training Materials',
      description: 'Create study-specific training content',
      icon: <BookOpen className="h-6 w-6" />,
      path: '/training-materials',
      progress: progress.training,
      status: 'Active'
    },
    {
      id: 'protocol',
      title: 'Protocol Analysis',
      description: 'AI-powered protocol optimization',
      icon: <Brain className="h-6 w-6" />,
      path: '/protocol-analysis',
      status: 'Ready',
      badge: 'AI Powered'
    },
    {
      id: 'documents',
      title: 'Document Center',
      description: 'Manage and organize study documents',
      icon: <FileText className="h-6 w-6" />,
      path: '/documents',
      status: 'Coming Soon',
      badge: 'Beta'
    },
    {
      id: 'metrics',
      title: 'Study Metrics',
      description: 'Track and analyze study progress',
      icon: <Target className="h-6 w-6" />,
      path: '/metrics',
      status: 'Coming Soon'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Study Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            {...module}
            onClick={() => navigate(module.path)}
          />
        ))}
      </div>
    </div>
  );
}