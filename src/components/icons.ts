import {ArrowRight, Check, ChevronsUpDown, Circle, Copy, Edit, ExternalLink, File, HelpCircle, Home, Loader2, Mail, MessageSquare, Moon, Plus, PlusCircle, Search, Server, Settings, Share2, Shield, Sun, Trash, User, X, Workflow} from 'lucide-react';

const Icons = {
  arrowRight: ArrowRight,
  check: Check,
  chevronDown: ChevronsUpDown,
  circle: Circle,
  workflow: Workflow,
  close: X,
  copy: Copy,
  dark: Moon,
  edit: Edit,
  externalLink: ExternalLink,
  file: File,
  help: HelpCircle,
  home: Home,
  light: Sun,
  loader: Loader2,
  mail: Mail,
  messageSquare: MessageSquare,
  plus: Plus,
  plusCircle: PlusCircle,
  search: Search,
  server: Server,
  settings: Settings,
  share: Share2,
  shield: Shield,
  spinner: Loader2,
  trash: Trash,
  user: User,
  // Culturally relevant icons (using inline SVGs since lucide doesn't have them)
  mobileMoney: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M12 2L4.5 20H19.5L12 2ZM12 16.75L6.89 10.5H17.11L12 16.75Z"/>
    </svg>
  ),
  chopMoney: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M5 4.5C5 3.67 5.67 3 6.5 3H17.5C18.33 3 19 3.67 19 4.5V6.5C19 7.33 18.33 8 17.5 8H6.5C5.67 8 5 7.33 5 6.5V4.5ZM6.5 4.5V6.5H17.5V4.5H6.5ZM5 11.5C5 10.67 5.67 10 6.5 10H17.5C18.33 10 19 10.67 19 11.5V13.5C19 14.33 18.33 15 17.5 15H6.5C5.67 15 5 14.33 5 13.5V11.5ZM6.5 11.5V13.5H17.5V11.5H6.5ZM5 16.5C5 15.67 5.67 15 6.5 15H17.5C18.33 15 19 15.67 19 16.5V18.5C19 19.33 18.33 20 17.5 20H6.5C5.67 20 5 19.33 5 18.5V16.5ZM6.5 16.5V18.5H17.5V16.5H6.5Z"/>
    </svg>
  ),
  trotro: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M3 8V7C3 5.89 3.89 5 5 5H19C20.11 5 21 5.89 21 7V8H3ZM5 9H19V17C19 18.11 18.11 19 17 19H7C5.89 19 5 18.11 5 17V9ZM7 11H9V13H7V11ZM11 11H13V13H11V11ZM15 11H17V13H15V11ZM7 15H9V17H7V15ZM15 15H17V17H15V15Z"/>
    </svg>
  ),
};

export {Icons};
