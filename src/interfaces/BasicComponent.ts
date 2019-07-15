export default interface BasicComponent {
  id: string;
  loaded: boolean;
  type: string;
  variables?: any;
  title?: string;
  data?: any;
  sections?: any;
}
