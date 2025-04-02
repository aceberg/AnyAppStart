package models

// Conf - web gui config
type Conf struct {
	Host     string
	Port     string
	Theme    string
	Color    string
	ConfPath string
	DirPath  string
	ItemPath string
	TypePath string
	NodePath string
}

// Item - one service or container
type Item struct {
	ID    int    `yaml:"ID"`
	Group string `yaml:"group"`
	Name  string `yaml:"name"`
	Type  string `yaml:"type"`
	Link  string `yaml:"link,omitempty"`
	Icon  string `yaml:"icon,omitempty"`
	Exec  string `yaml:"-"`
	State string `yaml:"-"`
	Mem   string `yaml:"-"`
	CPU   string `yaml:"-"`
}

// TypeStruct - one type struct
type TypeStruct struct {
	Name    string
	Start   string
	Restart string
	Stop    string
	Logs    string
	State   string
	Mem     string
	CPU     string
	SSH     string
	AnyCom  string
}

// ExecOutput - result of Exec or ExecAny
type ExecOutput struct {
	Ok  bool
	Out string
}
