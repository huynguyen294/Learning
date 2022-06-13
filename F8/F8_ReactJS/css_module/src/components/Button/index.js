import btn from './button.module.scss'
import clsx from 'clsx'

function Button ({primary, success, warning}) {
    return (
        <button className={clsx(btn.btn,{
            [btn.primary]: primary,
            [btn.success]: success,
            [btn.warning]: warning,
            'd-flex': true
        }
        )}>Click Me!!!
        </button>
    )
}

export default Button