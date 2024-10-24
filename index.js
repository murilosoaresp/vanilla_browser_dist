import { List, exaustive_switch, Opt, CoreExtensions, HashMap } from 'vanilla_core';
import { Vec2D } from 'vanilla_math';

const PROP_NAME_MAP = {
    position: { css: "position", js: "position" },
    top: { css: "top", js: "top" },
    left: { css: "left", js: "left" },
    width: { css: "width", js: "width" },
    min_width: { css: "min-width", js: "minWidth" },
    max_width: { css: "max-width", js: "maxWidth" },
    height: { css: "height", js: "height" },
    min_height: { css: "min-height", js: "minHeight" },
    max_height: { css: "max-height", js: "maxHeight" },
    rotate: { css: "rotate", js: "rotate" },
    margin: { css: "margin", js: "margin" },
    margin_top: { css: "margin-top", js: "marginTop" },
    margin_right: { css: "margin-right", js: "marginRight" },
    margin_bottom: { css: "margin-bottom", js: "marginBottom" },
    margin_left: { css: "margin-left", js: "marginLeft" },
    padding: { css: "padding", js: "padding" },
    padding_top: { css: "padding-top", js: "paddingTop" },
    padding_right: { css: "padding-right", js: "paddingRight" },
    padding_bottom: { css: "padding-bottom", js: "paddingBottom" },
    padding_left: { css: "padding-left", js: "paddingLeft" },
    display: { css: "display", js: "display" },
    flex_direction: { css: "flex-direction", js: "flexDirection" },
    justify_content: { css: "justify-content", js: "justifyContent" },
    align_items: { css: "align-items", js: "alignItems" },
    gap: { css: "gap", js: "gap" },
    flex_grow: { css: "flex-grow", js: "flexGrow" },
    flex_wrap: { css: "flex-wrap", js: "flexWrap" },
    border_style: { css: "border-style", js: "borderStyle" },
    border_width: { css: "border-width", js: "borderWidth" },
    border_radius: { css: "border-radius", js: "borderRadius" },
    background_color: { css: "background-color", js: "backgroundColor" },
    color: { css: "color", js: "color" },
    border_color: { css: "border-color", js: "borderColor" },
    font_family: { css: "font-family", js: "fontFamily" },
    font_size: { css: "font-size", js: "fontSize" },
    text_decoration: { css: "text-decoration", js: "textDecoration" },
    writing_mode: { css: "writing-mode", js: "writingMode" },
    filter: { css: "filter", js: "filter" },
    backdrop_filter: { css: "backdrop-filter", js: "backdropFilter" },
    box_shadow: { css: "box-shadow", js: "boxShadow" },
    object_fit: { css: "object-fit", js: "objectFit" },
    white_space: { css: "white-space", js: "whiteSpace" },
    text_overflow: { css: "text-overflow", js: "textOverflow" },
    overflow: { css: "overflow", js: "overflow" },
    cursor: { css: "cursor", js: "cursor" },
};

class CssStyle {
    constructor(style) {
        this.style = style;
    }
    str() {
        return List.of(Object.keys(this.style))
            .map(prop => `${PROP_NAME_MAP[prop].css}: ${this.style[prop]};`)
            .join(" ");
    }
    apply_to_html_elem(html_elem) {
        Object.keys(this.style)
            .forEach(key => {
            html_elem.style[PROP_NAME_MAP[key].js] = this.style[key];
        });
    }
}

var CssResset;
(function (CssResset) {
    CssResset.CLASSES = {
        noSelect: "no-select"
    };
    const CSS_RESSET = `
    * {
        box-sizing: border-box;
    }
    input {
        background-color: transparent;
        border-style: none;
    }
    textarea:focus, input:focus{
        outline: none;
    }

    .${CssResset.CLASSES.noSelect} {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
    }

    svg {
        width: 100%;
        height: 100%;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    `;
    function add_to_header() {
        document.head.insert_before_end(`<style tag="CSS_RESSET">\n${CSS_RESSET}\n</style>\n`);
    }
    CssResset.add_to_header = add_to_header;
})(CssResset || (CssResset = {}));

var CssUtils;
(function (CssUtils) {
    function Border(style, widthPx, radiusPx, color) {
        return [
            `border-style: ${style};`,
            `border-width: ${widthPx}px;`,
            `border-radius: ${radiusPx}px;`,
            `border-color: ${color.rgba_string()};`,
        ].join("\n");
    }
    CssUtils.Border = Border;
    function scroll_bar(cssClassName, widthPx, track, thumb) {
        return `.${cssClassName}::-webkit-scrollbar {
            width: ${widthPx}px;
        }
        .${cssClassName}::-webkit-scrollbar-track {
            ${track.borderStyle === null ? "" : `border-style: ${track.borderStyle}`};
            ${track.borderRadius === null ? "" : `border-radius: ${track.borderRadius}px`};
            ${track.borderColor === null ? `border-color: transparent` : `border-color: ${track.borderColor.rgba_string()}`};
            ${track.backgroundColor === null ? `background-color: transparent` : `background-color: ${track.backgroundColor.rgba_string()}`};
        }
        .${cssClassName}::-webkit-scrollbar-thumb {
            ${thumb.borderRadius === null ? "" : `border-radius: ${thumb.borderRadius}px`};
            ${thumb.backgroundColor === null ? `background-color: transparent` : `background-color: ${thumb.backgroundColor.rgba_string()}`};
        }`;
    }
    CssUtils.scroll_bar = scroll_bar;
})(CssUtils || (CssUtils = {}));

var CursorIcon;
(function (CursorIcon) {
    CursorIcon.Enum = {
        default: {
            css_name: function () { return "default"; },
            set_as_active: function () {
                document.body.style.cursor = this.css_name();
            }
        },
        move: {
            css_name: function () { return "move"; },
            set_as_active: function () {
                document.body.style.cursor = this.css_name();
            }
        },
        pointer: {
            css_name: function () { return "pointer"; },
            set_as_active: function () {
                document.body.style.cursor = this.css_name();
            }
        },
        text: {
            css_name: function () { return "text"; },
            set_as_active: function () {
                document.body.style.cursor = this.css_name();
            }
        },
        resize_vertical: {
            css_name: function () { return "n-resize"; },
            set_as_active: function () {
                document.body.style.cursor = this.css_name();
            }
        },
        resize_horizontal: {
            css_name: function () { return "e-resize"; },
            set_as_active: function () {
                document.body.style.cursor = this.css_name();
            }
        },
        resize_main_diag: {
            css_name: function () { return "nw-resize"; },
            set_as_active: function () {
                document.body.style.cursor = this.css_name();
            }
        },
        resize_sec_diag: {
            css_name: function () { return "ne-resize"; },
            set_as_active: function () {
                document.body.style.cursor = this.css_name();
            }
        },
    };
})(CursorIcon || (CursorIcon = {}));

var MouseButtonUtils;
(function (MouseButtonUtils) {
    function parse_ev_code(ev_code) {
        switch (ev_code) {
            case 0:
                return "left";
            case 1:
                return "center";
            case 2:
                return "right";
            default:
                throw new Error();
        }
    }
    MouseButtonUtils.parse_ev_code = parse_ev_code;
})(MouseButtonUtils || (MouseButtonUtils = {}));

class DragListener {
    constructor(div, mouse_state) {
        this.on_drag_start = () => { };
        this.on_mouse_left_up = () => { };
        this.state = "idle";
        this.div = div;
        this.mouse_state = mouse_state;
        this.mouse_press_position = Vec2D.zero();
        this.is_mouse_over = false;
        this.div.addEventListener("mouseenter", () => this.is_mouse_over = true);
        this.div.addEventListener("mouseleave", () => this.is_mouse_over = false);
        this.div.addEventListener("mouseup", ev => {
            let mouse_button = MouseButtonUtils.parse_ev_code(ev.button);
            if (mouse_button === "left") {
                this.on_mouse_left_up();
            }
        });
    }
    async _update(td_ms) {
        switch (this.state) {
            case "idle":
                if (this.is_mouse_over) {
                    let left_button = this.mouse_state.get_button_state("left");
                    if (left_button.is_press()) {
                        this.mouse_press_position = this.mouse_state.position();
                        this.state = "mouse_down";
                    }
                }
                if (this.is_mouse_over
                    && this.mouse_state.get_button_state("left").is_press()) {
                    this.mouse_press_position = this.mouse_state.position();
                    this.state = "mouse_down";
                }
                break;
            case "mouse_down":
                if (this.mouse_state.get_button_state("left").is_release()) {
                    this.mouse_press_position = Vec2D.zero();
                    this.state = "idle";
                }
                else {
                    let mouse_shift = this.mouse_press_position.shift_to(this.mouse_state.position()).norm();
                    if (mouse_shift > 10.0) {
                        this.on_drag_start();
                        this.state = "dragging";
                    }
                }
                break;
            case "dragging":
                if (this.mouse_state.get_button_state("left").is_release()) {
                    this.mouse_press_position = Vec2D.zero();
                    this.state = "idle";
                }
                break;
            default:
                exaustive_switch(this.state);
        }
    }
}

var HtmlUtils;
(function (HtmlUtils) {
    function get_div_by_id(id) {
        let element_opt = document.getElementById(id.toString());
        if (element_opt === null) {
            return Opt.none();
        }
        else {
            return Opt.some(element_opt);
        }
    }
    HtmlUtils.get_div_by_id = get_div_by_id;
    function get_image_by_id(id) {
        let element_opt = document.getElementById(id.toString());
        if (element_opt === null) {
            return Opt.none();
        }
        else {
            return Opt.some(element_opt);
        }
    }
    HtmlUtils.get_image_by_id = get_image_by_id;
    function get_input_by_id(id) {
        let element_opt = document.getElementById(id.toString());
        if (element_opt === null) {
            return Opt.none();
        }
        else {
            return Opt.some(element_opt);
        }
    }
    HtmlUtils.get_input_by_id = get_input_by_id;
    function get_textarea_by_id(id) {
        let element_opt = document.getElementById(id.toString());
        if (element_opt === null) {
            return Opt.none();
        }
        else {
            return Opt.some(element_opt);
        }
    }
    HtmlUtils.get_textarea_by_id = get_textarea_by_id;
    function get_paragraph_by_id(id) {
        let element_opt = document.getElementById(id.toString());
        if (element_opt === null) {
            return Opt.none();
        }
        else {
            return Opt.some(element_opt);
        }
    }
    HtmlUtils.get_paragraph_by_id = get_paragraph_by_id;
    function get_script_by_id(id) {
        let element_opt = document.getElementById(id.toString());
        if (element_opt === null) {
            return Opt.none();
        }
        else {
            return Opt.some(element_opt);
        }
    }
    HtmlUtils.get_script_by_id = get_script_by_id;
    function get_canvas_by_id(id) {
        let element_opt = document.getElementById(id.toString());
        if (element_opt === null) {
            return Opt.none();
        }
        else {
            return Opt.some(element_opt);
        }
    }
    HtmlUtils.get_canvas_by_id = get_canvas_by_id;
})(HtmlUtils || (HtmlUtils = {}));

class DragManager {
    constructor(mouse_state) {
        this.mouse_state = mouse_state;
        this.drag_div_opt = Opt.none();
        this.data_opt = Opt.none();
        this.should_stop_drag = false;
    }
    async _update(td_ms) {
        if (this.drag_div_opt.is_some()) {
            let position = this.mouse_state.position();
            this.drag_div_opt.value_unchecked().style.left = `${position.x}px`;
            this.drag_div_opt.value_unchecked().style.top = `${position.y}px`;
            if (this.mouse_state.get_button_state("left").is_release()) {
                this.should_stop_drag = true;
            }
        }
        if (this.should_stop_drag) {
            this.drag_div_opt.value_or_throw().remove();
            this.drag_div_opt = Opt.none();
            this.data_opt = Opt.none();
            this.should_stop_drag = false;
        }
    }
    _start_drag(data, drag_html) {
        if (this.drag_div_opt.is_some())
            throw new Error();
        this.data_opt = Opt.some(data);
        document.body.insert_before_end(drag_html.html);
        let drag_div = HtmlUtils.get_div_by_id(drag_html.outer_div_id).value_or_throw();
        this.drag_div_opt = Opt.some(drag_div);
    }
    get_data() { return this.data_opt; }
}

var StringExtensions;
(function (StringExtensions) {
    function load() { }
    StringExtensions.load = load;
})(StringExtensions || (StringExtensions = {}));
String.prototype.encode_base64 = function () {
    return btoa(this);
};
String.prototype.decode_base64_to_string = function () {
    return atob(this);
};
String.prototype.decode_base64_to_arraybuffer = function () {
    var binaryString = atob(this);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};

var BrowserExtensions;
(function (BrowserExtensions) {
    function load() {
        CoreExtensions.load();
        StringExtensions.load();
    }
    BrowserExtensions.load = load;
})(BrowserExtensions || (BrowserExtensions = {}));

var HTMLElementExtensions;
(function (HTMLElementExtensions) {
    function load() { }
    HTMLElementExtensions.load = load;
})(HTMLElementExtensions || (HTMLElementExtensions = {}));
HTMLElement.prototype.is_alive = function () {
    let parent = this.parentElement;
    if (parent === null) {
        return false;
    }
    else if (parent === document.body) {
        return true;
    }
    else {
        return parent.is_alive();
    }
};
HTMLElement.prototype.insert_before_end = function (html) {
    this.insertAdjacentHTML("beforeend", html);
};
HTMLElement.prototype.insert_after_begin = function (html) {
    this.insertAdjacentHTML("afterbegin", html);
};
HTMLElement.prototype.apply_css = function (css_obj) {
    new CssStyle(css_obj).apply_to_html_elem(this);
};

class FetchResponse {
    constructor(inner_buffer) {
        this.inner_buffer = inner_buffer;
    }
    parse_as_json() {
        let json = new TextDecoder().decode(this.inner_buffer);
        return JSON.parse(json);
    }
}

var FileSelection;
(function (FileSelection) {
    async function get_file_as_string() {
        return new Promise((res, rej) => {
            var input = document.createElement('input');
            input.type = 'file';
            input.onchange = e => {
                // getting a hold of the file reference
                var file = e.target.files[0];
                // setting up the reader
                var reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                // here we tell the reader what to do when it's done reading...
                reader.onload = readerEvent => {
                    var content = readerEvent.target.result; // this is the content!
                    res({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        content,
                    });
                };
            };
            input.click();
        });
    }
    FileSelection.get_file_as_string = get_file_as_string;
    async function get_file_bytes() {
        return new Promise((res, rej) => {
            var input = document.createElement('input');
            input.type = 'file';
            input.onchange = e => {
                // getting a hold of the file reference
                var file = e.target.files[0];
                // setting up the reader
                var reader = new FileReader();
                reader.readAsArrayBuffer(file);
                // here we tell the reader what to do when it's done reading...
                reader.onload = readerEvent => {
                    var content = readerEvent.target.result; // this is the content!
                    res({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        content,
                    });
                };
            };
            input.click();
        });
    }
    FileSelection.get_file_bytes = get_file_bytes;
})(FileSelection || (FileSelection = {}));

var FontStyle;
(function (FontStyle) {
    FontStyle.Enum = {
        normal: {
            css_name: () => "normal"
        },
        italic: {
            css_name: () => "italic"
        }
    };
})(FontStyle || (FontStyle = {}));

var FontWeight;
(function (FontWeight) {
    FontWeight.Enum = {
        "w100": {
            css_value: () => "w100",
        },
        "w200": {
            css_value: () => "w200",
        },
        "w300": {
            css_value: () => "w300",
        },
        "w400": {
            css_value: () => "w400",
        },
        "w500": {
            css_value: () => "w500",
        },
        "w600": {
            css_value: () => "w600",
        },
        "w700": {
            css_value: () => "w700",
        },
        "w800": {
            css_value: () => "w800",
        },
        "w900": {
            css_value: () => "w900",
        },
    };
})(FontWeight || (FontWeight = {}));

class Font {
    constructor(family, style, weight) {
        this.family = family;
        this.style = style;
        this.weight = weight;
    }
    static of(family, style, weight) {
        return new Font(family, FontStyle.Enum[style], FontWeight.Enum[weight]);
    }
    /**
     * Appends the font as base64 to the document header
     */
    append_base64_to_head(font_base64) {
        let css_style = `@font-face {
            font-family: '${this.family}';
            font-weight: ${this.weight.css_value()};
            font-style: ${this.style.css_name()};
            src: url(data:font/truetype;charset=utf-8;base64,${font_base64});
        }`;
        document.head.insertAdjacentHTML("beforeend", `<style tag="font ${this.family}_${this.style.css_name()}_${this.weight.css_value()}">\n${css_style}\n</style>`);
    }
    /**
     * Appends the font as base64 to the document header
     */
    append_path_to_head(font_path) {
        let css_style = `@font-face {
            font-family: '${this.family}';
            font-weight: ${this.weight.css_value()};
            font-style: ${this.style.css_name()};
            src: url(${font_path});
        }`;
        document.head.insertAdjacentHTML("beforeend", `<style tag="font ${this.family}_${this.style.css_name()}_${this.weight.css_value()}">\n${css_style}\n</style>`);
    }
    css_style() {
        return `font-family: '${this.family}';
        font-weight: ${this.weight.css_value()};
        font-style: ${this.style.css_name()};`;
    }
}

class ButtonState {
    constructor() {
        this.is_press_ = false;
        this.is_down_ = false;
        this.is_release_ = false;
        this.is_up_ = true;
        this.is_click_ = false;
        this.is_double_click_ = false;
        this.click_history = new List();
    }
    is_press() { return this.is_press_; }
    is_down() { return this.is_down_; }
    is_release() { return this.is_release_; }
    is_up() { return this.is_up_; }
    is_click() { return this.is_click_; }
    is_double_click() { return this.is_double_click_; }
    _press() {
        this.is_press_ = true;
        this.is_down_ = true;
        this.is_release_ = false;
        this.is_up_ = false;
        this.push_to_history(true);
        this.is_click_ = false;
        this.is_double_click_ = false;
    }
    _release() {
        this.is_release_ = true;
        this.push_to_history(false);
        this.is_click_ = this.check_click();
        this.is_double_click_ = this.check_double_click();
    }
    _clean_up() {
        this.is_press_ = false;
        if (this.is_release_) {
            this.is_release_ = false;
            this.is_down_ = false;
            this.is_up_ = true;
        }
        this.is_click_ = false;
        this.is_double_click_ = false;
    }
    check_click() {
        if (this.click_history.len() === 2) {
            return this.click_history.get(1).timestap - this.click_history.get(0).timestap <= 100.0;
        }
        else if (this.click_history.len() === 4) {
            return this.click_history.get(3).timestap - this.click_history.get(2).timestap <= 100.0;
        }
        else {
            return false;
        }
    }
    check_double_click() {
        if (this.click_history.len() === 2) {
            return false;
        }
        else if (this.click_history.len() === 4) {
            return this.click_history.get(3).timestap - this.click_history.get(0).timestap <= 200.0;
        }
        else {
            return false;
        }
    }
    push_to_history(is_press) {
        this.click_history.push({ press: is_press, timestap: Date.now() });
        if (this.click_history.len() > 4) {
            this.click_history.remove(0);
        }
    }
}

class KeyboardState {
    constructor() {
        this.buttons = new List();
        this.key_map = new HashMap();
    }
    get_button_state(key) {
        if (this.key_map.contains_hash(key) === false) {
            this.buttons.push(new ButtonState());
            this.key_map.insert(key, this.buttons.len() - 1);
        }
        let index = this.key_map.get(key).value_unchecked();
        return this.buttons.get(index);
    }
    _process_raw_ev(ev) {
        switch (ev.tag) {
            case "keyboard_key_press": {
                this.get_button_state(ev.val.key)._press();
                break;
            }
            case "keyboard_key_release":
                this.get_button_state(ev.val.key)._release();
                break;
        }
    }
    _clean_up() {
        this.buttons.for_each(x => x._clean_up());
    }
}

class MouseState {
    constructor() {
        this.position_ = Vec2D.zero();
        this.shift_ = Vec2D.zero();
        this.scroll_ = 0;
        this.buttons = {
            left: new ButtonState(),
            center: new ButtonState(),
            right: new ButtonState(),
        };
    }
    _process_raw_ev(raw_ev) {
        switch (raw_ev.tag) {
            case "mouse_button_press":
                this.buttons[raw_ev.val.button]._press();
                break;
            case "mouse_button_release":
                this.buttons[raw_ev.val.button]._release();
                break;
            case "mouse_move":
                this.position_ = raw_ev.val.position.clone();
                this.shift_ = this.shift_.plus_vec(raw_ev.val.shift);
                break;
            case "mouse_wheel":
                this.scroll_ += raw_ev.val.amount;
                break;
        }
    }
    position() {
        return this.position_.clone();
    }
    shift() {
        return this.shift_.clone();
    }
    get_button_state(button) {
        return this.buttons[button];
    }
    scroll() {
        return this.scroll_;
    }
    _clean_up() {
        this.buttons.left._clean_up();
        this.buttons.center._clean_up();
        this.buttons.right._clean_up();
        this.shift_ = Vec2D.zero();
        this.scroll_ = 0;
    }
}

class RawEventPool {
    constructor() {
        this.pool = new List();
        window.addEventListener("keydown", ev => {
            let key_tag = ev.key.toLowerCase();
            this.pool.push({
                tag: "keyboard_key_press",
                val: { key: key_tag },
            });
        });
        window.addEventListener("keyup", ev => {
            let key_tag = ev.key.toLowerCase();
            this.pool.push({
                tag: "keyboard_key_release",
                val: { key: key_tag },
            });
        });
        window.addEventListener("mousedown", ev => {
            let mouse_button = MouseButtonUtils.parse_ev_code(ev.button);
            this.pool.push({
                tag: "mouse_button_press",
                val: { button: mouse_button },
            });
        });
        window.addEventListener("mouseup", ev => {
            let mouse_button = MouseButtonUtils.parse_ev_code(ev.button);
            this.pool.push({
                tag: "mouse_button_release",
                val: { button: mouse_button },
            });
        });
        window.addEventListener("mousemove", ev => {
            this.pool.push({
                tag: "mouse_move",
                val: {
                    position: new Vec2D(ev.x, ev.y),
                    shift: new Vec2D(ev.movementX, ev.movementY),
                },
            });
        });
        window.addEventListener("wheel", ev => {
            this.pool.push({
                tag: "mouse_wheel",
                val: { amount: ev.deltaY },
            });
        });
    }
    pool_events(action) {
        this.pool.for_each(ev => action(ev));
        this.pool = new List();
    }
}

function div_tag(tag, id, css_inline, css_classes, inner) {
    let css_str = css_inline === null ? "" : css_inline.str();
    let classes_str = css_classes === null ? "" : css_classes.join(" ");
    let inner_str = inner === null ? "" : inner.join(" ");
    return `<div tag="${tag}" id="${id ?? ""}" style="${css_str}" class="${classes_str}">${inner_str}</div>`;
}
function div(id, css_inline, css_classes, inner) {
    let css_str = css_inline === null ? "" : css_inline.str();
    let classes_str = css_classes === null ? "" : css_classes.join(" ");
    let inner_str = inner === null ? "" : inner.join(" ");
    return `<div id="${id ?? ""}" style="${css_str}" class="${classes_str}">${inner_str}</div>`;
}
function paragraph(id, css_inline, css_classes, text) {
    let css_str = css_inline === null ? "" : css_inline.str();
    let classes_str = css_classes === null ? "" : css_classes.join(" ");
    return `<p id="${id ?? ""}" style="${css_str}" class="${classes_str}">${text}</p>`;
}
function text_input(id, css_inline, css_classes) {
    let css_str = css_inline === null ? "" : css_inline.str();
    let classes_str = css_classes === null ? "" : css_classes.join(" ");
    return `<input id="${id ?? ""}" type="text" style="${css_str}" class="${classes_str}">`;
}

var ImageUtils;
(function (ImageUtils) {
    async function fetch_image_metadata(path) {
        return new Promise((res, rej) => {
            let html_image = new Image();
            html_image.src = path;
            html_image.onload = () => {
                const width = html_image.width;
                const height = html_image.height;
                res({
                    width,
                    height,
                });
            };
            html_image.onerror = () => { rej(); };
        });
    }
    ImageUtils.fetch_image_metadata = fetch_image_metadata;
})(ImageUtils || (ImageUtils = {}));

export { BrowserExtensions, ButtonState, CssResset, CssStyle, CssUtils, CursorIcon, DragListener, DragManager, FetchResponse, FileSelection, Font, FontStyle, FontWeight, HTMLElementExtensions, HtmlUtils, ImageUtils, KeyboardState, MouseButtonUtils, MouseState, PROP_NAME_MAP, RawEventPool, StringExtensions, div, div_tag, paragraph, text_input };
