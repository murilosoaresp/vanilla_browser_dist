import { Color, Vec2D, Opt } from 'vanilla_core';

type CssStyleObj = {
    position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
    top?: string;
    left?: string;
    width?: string;
    min_width?: string;
    max_width?: string;
    height?: string;
    min_height?: string;
    max_height?: string;
    rotate?: string;
    margin?: string;
    margin_top?: string;
    margin_right?: string;
    margin_bottom?: string;
    margin_left?: string;
    padding?: string;
    padding_top?: string;
    padding_right?: string;
    padding_bottom?: string;
    padding_left?: string;
    display?: "none" | "block" | "inline" | "inline-block" | "flex" | "inline-flex" | "grid" | "inline-grid" | "flow-root";
    flex_direction?: "row" | "row-reverse" | "column" | "column-reverse";
    justify_content?: "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right" | "normal" | "space-between" | "space-around" | "space-evenly" | "stretch";
    align_items?: "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "self-start" | "self-end" | "anchor-center" | "baseline";
    gap?: string;
    flex_grow?: string;
    flex_wrap?: "nowrap" | "wrap" | "wrap-reverse";
    border_style?: "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset" | "none" | "hidden";
    border_width?: string;
    border_radius?: string;
    background_color?: string;
    color?: string;
    border_color?: string;
    font_family?: string;
    font_size?: string;
    text_decoration?: string;
    writing_mode?: "horizontal-tb" | "vertical-rl" | "vertical-lr";
    filter?: string;
    backdrop_filter?: string;
    box_shadow?: string;
    object_fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
    white_space?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | "break-spaces";
    text_overflow?: "clip" | "ellipsis";
    overflow?: "visible" | "hidden" | "clip" | "scroll" | "auto" | "hidden visible";
    cursor?: "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" | "wait" | "cell" | "crosshair" | "text" | "alias" | "copy" | "move" | "no-drop" | "not-allowed" | "grab" | "grabbing" | "all-scroll" | "col-resize" | "row-resize" | "n-resize" | "e-resize" | "s-resize" | "w-resize" | "ne-resize" | "nw-resize" | "se-resize" | "sw-resize" | "ew-resize" | "ns-resize" | "nesw-resize" | "nwse-resize" | "zoom-in" | "zoom-out";
};
declare const PROP_NAME_MAP: Record<keyof CssStyleObj, {
    css: string;
    js: string;
}>;

declare class CssStyle {
    readonly style: CssStyleObj;
    constructor(style: CssStyleObj);
    str(): string;
    apply_to_html_elem(html_elem: HTMLElement): void;
}

declare namespace CssResset {
    const CLASSES: {
        noSelect: string;
    };
    function add_to_header(): void;
}

declare namespace CssUtils {
    function Border(style: "solid", widthPx: number, radiusPx: number, color: Color): string;
    function scroll_bar(cssClassName: string, widthPx: number, track: {
        borderStyle: "solid" | null;
        borderRadius: number | null;
        borderColor: Color | null;
        backgroundColor: Color | null;
    }, thumb: {
        borderRadius: number | null;
        backgroundColor: Color | null;
    }): string;
}

declare namespace CursorIcon {
    type Tag = "default" | "move" | "pointer" | "text" | "resize_vertical" | "resize_horizontal" | "resize_main_diag" | "resize_sec_diag";
    type Class = {
        css_name: () => string;
        set_as_active: () => void;
    };
    const Enum: Record<Tag, Class>;
}

type MouseButton = "left" | "center" | "right";
declare namespace MouseButtonUtils {
    function parse_ev_code(ev_code: number): MouseButton;
}

declare class ButtonState {
    private is_press_;
    private is_down_;
    private is_release_;
    private is_click_;
    private is_double_click_;
    private is_up_;
    private click_history;
    constructor();
    is_press(): boolean;
    is_down(): boolean;
    is_release(): boolean;
    is_up(): boolean;
    is_click(): boolean;
    is_double_click(): boolean;
    _press(): void;
    _release(): void;
    _clean_up(): void;
    private check_click;
    private check_double_click;
    private push_to_history;
}

type KeyboardKeyTag = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "shift" | "control" | "alt" | "altgraph" | "meta" | "capslock" | "numlock" | "scrolllock" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "f9" | "f10" | "f11" | "f12" | "arrowup" | "arrowdown" | "arrowleft" | "arrowright" | "home" | "end" | "pageup" | "pagedown" | "insert" | "delete" | "backspace" | "escape" | "pause" | "printscreen" | "contextmenu" | "enter" | "tab" | " " | "-" | "=" | "[" | "]" | "\\" | ";" | "'" | "," | "." | "/" | "\"" | "!" | "@" | "#" | "$" | "%" | "^" | "&" | "*" | "(" | ")" | "_" | "+" | "{" | "}" | "|" | ":" | "\"" | "<" | ">" | "?" | "~" | "\`" | "numpad0" | "numpad1" | "numpad2" | "numpad3" | "numpad4" | "numpad5" | "numpad6" | "numpad7" | "numpad8" | "numpad9" | "numpaddecimal" | "numpadadd" | "numpadsubtract" | "numpadmultiply" | "numpaddivide" | "numpadenter" | "numpadequal" | "capslock" | "numlock" | "scrolllock";

type RawEvent = {
    tag: "keyboard_key_press";
    val: {
        key: KeyboardKeyTag;
    };
} | {
    tag: "keyboard_key_release";
    val: {
        key: KeyboardKeyTag;
    };
} | {
    tag: "mouse_button_press";
    val: {
        button: MouseButton;
    };
} | {
    tag: "mouse_button_release";
    val: {
        button: MouseButton;
    };
} | {
    tag: "mouse_move";
    val: {
        position: Vec2D;
        shift: Vec2D;
    };
} | {
    tag: "mouse_wheel";
    val: {
        amount: number;
    };
};
declare class RawEventPool {
    private pool;
    constructor();
    pool_events(action: (ev: RawEvent) => void): void;
}

declare class MouseState {
    private position_;
    private shift_;
    private scroll_;
    private buttons;
    constructor();
    _process_raw_ev(raw_ev: RawEvent): void;
    position(): Vec2D;
    shift(): Vec2D;
    get_button_state(button: MouseButton): ButtonState;
    scroll(): number;
    _clean_up(): void;
}

declare class DragListener {
    private state;
    private div;
    private mouse_state;
    private mouse_press_position;
    private is_mouse_over;
    on_drag_start: () => void;
    on_mouse_left_up: () => void;
    constructor(div: HTMLDivElement, mouse_state: MouseState);
    _update(td_ms: number): Promise<void>;
}

declare class DragManager<Data> {
    private mouse_state;
    private drag_div_opt;
    private data_opt;
    private should_stop_drag;
    constructor(mouse_state: MouseState);
    _update(td_ms: number): Promise<void>;
    _start_drag(data: Data, drag_html: {
        html: string;
        outer_div_id: number;
    }): void;
    get_data(): Opt<Data>;
}

declare namespace BrowserExtensions {
    function load(): void;
}

declare namespace HTMLElementExtensions {
    function load(): void;
}
declare global {
    interface HTMLElement {
        is_alive(): boolean;
        insert_before_end(html: string): void;
        insert_after_begin(html: string): void;
        apply_css(css_obj: CssStyleObj): void;
    }
}

declare namespace StringExtensions {
    function load(): void;
}
declare global {
    interface String {
        encode_base64(): string;
        decode_base64_to_string(): string;
        decode_base64_to_arraybuffer(): ArrayBuffer;
    }
}

declare namespace Fetch {
    type FetchError = {
        tag: "no_response";
        error: any;
    } | {
        tag: "responded";
        status_code: string;
    };
}

declare class FetchResponse {
    private inner_buffer;
    constructor(inner_buffer: ArrayBuffer);
    parse_as_json<T>(): T;
}

declare namespace FileSelection {
    type FileAsStringOutput = {
        name: string;
        size: number;
        type: string;
        content: string;
    };
    function get_file_as_string(): Promise<FileAsStringOutput>;
    type FileAsBufferOutput = {
        name: string;
        size: number;
        type: string;
        content: ArrayBuffer;
    };
    function get_file_bytes(): Promise<FileAsBufferOutput>;
}

declare namespace FontStyle {
    type Tag = "normal" | "italic";
    type Class = {
        css_name: () => string;
    };
    const Enum: Record<Tag, Class>;
}

declare namespace FontWeight {
    type Tag = "w100" | "w200" | "w300" | "w400" | "w500" | "w600" | "w700" | "w800" | "w900";
    type Class = {
        css_value: () => string;
    };
    const Enum: Record<Tag, Class>;
}

declare class Font {
    readonly family: string;
    readonly style: FontStyle.Class;
    readonly weight: FontWeight.Class;
    constructor(family: string, style: FontStyle.Class, weight: FontWeight.Class);
    static of(family: string, style: FontStyle.Tag, weight: FontWeight.Tag): Font;
    /**
     * Appends the font as base64 to the document header
     */
    append_base64_to_head(font_base64: string): void;
    /**
     * Appends the font as base64 to the document header
     */
    append_path_to_head(font_path: string): void;
    css_style(): string;
}

declare namespace HtmlUtils {
    function get_div_by_id(id: number): Opt<HTMLDivElement>;
    function get_image_by_id(id: number): Opt<HTMLImageElement>;
    function get_input_by_id(id: number): Opt<HTMLInputElement>;
    function get_textarea_by_id(id: number): Opt<HTMLTextAreaElement>;
    function get_paragraph_by_id(id: number): Opt<HTMLParagraphElement>;
    function get_script_by_id(id: number): Opt<HTMLScriptElement>;
    function get_canvas_by_id(id: number): Opt<HTMLCanvasElement>;
}

declare class KeyboardState {
    private buttons;
    private key_map;
    constructor();
    get_button_state(key: KeyboardKeyTag): ButtonState;
    _process_raw_ev(ev: RawEvent): void;
    _clean_up(): void;
}

type NativeInterface = {
    sync: {
        delete_file: (file_path: string) => void;
        read_file_to_string: (file_path: string) => string;
        read_file_to_buffer: (file_path: string) => Uint8Array;
        read_dir: (dir_path: string, options?: {
            recursive: boolean;
        }) => string[];
        write_string_to_file: (file_path: string, content: string) => void;
        write_buffer_to_file: (file_path: string, content: ArrayBuffer) => void;
    };
    prom: {
        delete_file: (file_path: string) => Promise<void>;
        read_file_to_string: (file_path: string) => Promise<string>;
        read_file_to_buffer: (file_path: string) => Promise<Uint8Array>;
        read_dir: (dir_path: string, options?: {
            recursive: boolean;
        }) => Promise<string[]>;
        write_string_to_file: (file_path: string, content: string) => Promise<void>;
        write_buffer_to_file: (file_path: string, content: ArrayBuffer) => Promise<void>;
    };
};

declare function div_tag(tag: string, id: number | null, css_inline: CssStyle | null, css_classes: string[] | null, inner: string[] | null): string;
declare function div(id: number | null, css_inline: CssStyle | null, css_classes: string[] | null, inner: string[] | null): string;
declare function paragraph(id: number | null, css_inline: CssStyle | null, css_classes: string[] | null, text: string): string;
declare function text_input(id: number | null, css_inline: CssStyle | null, css_classes: string[] | null): string;

declare namespace ImageUtils {
    function fetch_image_metadata(path: string): Promise<{
        width: number;
        height: number;
    }>;
}

export { BrowserExtensions, ButtonState, CssResset, CssStyle, type CssStyleObj, CssUtils, CursorIcon, DragListener, DragManager, Fetch, FetchResponse, FileSelection, Font, FontStyle, FontWeight, HTMLElementExtensions, HtmlUtils, ImageUtils, type KeyboardKeyTag, KeyboardState, type MouseButton, MouseButtonUtils, MouseState, type NativeInterface, PROP_NAME_MAP, type RawEvent, RawEventPool, StringExtensions, div, div_tag, paragraph, text_input };
