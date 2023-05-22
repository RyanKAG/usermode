import { FaSpinner } from 'react-icons/fa';

const Button = ({
    content,
    isDisabled,
    classes,
    onClickHandler,
    isLoading,
    isDanger,
    isWarning,
}) => {
    return (
        <button
        type='button'
            className={`w-full rounded-lg py-1.5 flex justify-center z-50 items-center text-white text-lg font-semibold noselect ${
                isLoading || isDisabled
                    ? 'bg-secondary text-gray-400 cursor-default'
                    : isDanger
                    ? 'bg-red-500 transition-all duration-300 transform hover:bg-primary-300 focus:bg-primary-300 -translate-y-0.5 hover:-translate-y-0.5 focus:translate-y-0'
                    : isWarning
                    ? 'bg-yellow-500 transition-all duration-300 transform hover:bg-primary-300 focus:bg-primary-300 -translate-y-0.5 hover:-translate-y-1 focus:translate-y-0'
                    : 'bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:bg-primary-300 focus:bg-primary-300 -translate-y-0.5 hover:-translate-y-1 focus:translate-y-0'
            } ${classes}`}
            onClick={() => {
                if (onClickHandler && !isLoading && !isDisabled)
                    onClickHandler();
            }}
        >
            {isLoading ? (
                <FaSpinner className="animate-spin" size={28} />
            ) : (
                content
            )}
        </button>
    );
};

export default Button;
