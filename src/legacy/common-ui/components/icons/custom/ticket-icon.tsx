import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const TicketSvg = () => (
  <svg width="98" height="32" viewBox="0 0 98 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_132401_411596)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 8C0 3.58172 3.58172 0 8 0H90C94.4183 0 98 3.58172 98 8V11.0067C98 11.5564 97.5526 11.9934 97.0119 12.0924C94.865 12.4854 93.2578 14.0857 93.2578 16C93.2578 17.9143 94.865 19.5146 97.0119 19.9076C97.5526 20.0066 98 20.4436 98 20.9933V24C98 28.4183 94.4183 32 90 32H8C3.58172 32 0 28.4183 0 24V20.0382C0 20.0171 0.0171882 20 0.0383 20V20C2.67849 20 4.81879 18.2091 4.81879 16C4.81879 13.7909 2.67849 12 0.0383 12V12C0.0171882 12 0 11.9829 0 11.9618V8Z"
        fill="currentColor"
      />
      <path d="M62 2L62 6.75" stroke="#141414" strokeLinecap="round" />
      <path d="M62 9.75L62 14.5" stroke="#141414" strokeLinecap="round" />
      <path d="M62 17.5L62 22.25" stroke="#141414" strokeLinecap="round" />
      <path d="M62 25.25L62 30" stroke="#141414" strokeLinecap="round" />
    </g>
    <defs>
      <clipPath id="clip0_132401_411596">
        <rect width="98" height="32" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const TicketIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={TicketSvg} {...props} />;
